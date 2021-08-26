<template>
  <div class="container mx-auto bg-white rounded-2xl shadow-md mt-6 flex justify-center p-2">
    <div class="relative">
      <canvas class="rounded-2xl" id="c"></canvas>
      <div class="controls left-0 absolute mt-4 ml-12 top-0 bg-white p-2 border rounded-md flex">
        <button @click="createRectangle" class="border rounded py-1 px-2 mx-2 flex" id="addLine">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span class="ml-2">New step</span>
        </button>
        <button @click="resetZoom" class="border rounded py-1 px-2 mx-2 flex" id="resetZoom">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
          <span class="ml-2">Reset zoom</span>
        </button>
      </div>
    </div>
    <portal to="dialog">
      <step-details-dialog @save="saveStep" :step="game.selectedStep" v-model="dialogs.step_details"/>
    </portal>
  </div>
</template>

<script>
import StepDetailsDialog from '../components/NewGame/StepDetailsDialog.vue';
import Canvas from '../canvas/canvas';

export default {
  name: 'CreateNewGame',
  components: { StepDetailsDialog },
  data() {
    return {
      canvas: new Canvas(),
      dialogs: {
        step_details: false,
      },
      game: {
        steps: this.$store.getters.getSteps,
        selectedStep: null,
      },
    };
  },
  watch: {
    selectedNode(value) {
      if (value !== null && value.type === 'group') {
        if (this.currentMode === 'create') {
          // Create new step object
          const step = {
            id: value.id,
            internal_id: value.id,
            imageURL: null,
            description: null,
            choices: [],
          };
          // Save it in Vuex store
          this.$store.commit('addStep', step);

          // Select created step
          const stepIndex = this.game.steps.indexOf(step);
          this.game.selectedStep = this.game.steps[stepIndex];
        } else if (this.currentMode === 'edit') {
          const stepIndex = this.game.steps.findIndex((s) => s.id === this.selectedNode.id);
          this.$store.state.selectedStepIndex = stepIndex;
          this.game.selectedStep = { ...this.game.steps[stepIndex] };
        }
        this.dialogs.step_details = true;
      }
    },
  },
  computed: {
    selectedNode() {
      return this.canvas.selectedNode;
    },
    currentMode() { // 'create' || 'edit'
      return this.canvas.currentMode;
    },
  },
  mounted() {
    this.canvas.init();
    // Save canvas object to store to use its functions everywhere
    this.$store.state.canvas = this.canvas;

    this.$root.$on('test', () => {
      console.log('test');
    });
  },
  methods: {
    createRectangle() {
      this.canvas.createRect(9999, 9999, '#faf', 'placeholder');
      this.canvas.isAddingRect = true;
    },
    saveStep() {
      // Update step in Vuex store
      this.$store.commit('saveStep', this.game.selectedStep);
      // Change canvas node id
      this.canvas.setNodeID(this.game.selectedStep.id);
      // Draw connections between steps
      this.makeConnections();
    },
    makeConnections() {
      const steps = this.$store.getters.getSteps;
      const connections = [];
      steps.forEach((step) => {
        const choices = step.choices;
        if (choices && choices.length) {
          choices.forEach((choice) => {
            if (choice.linkTo) {
              connections.push({
                source: step.id,
                target: choice.linkTo,
              });
            }
          });
        }
      });
      this.canvas.createConnections(connections);
    },
    resetZoom() {
      this.canvas.resetZoom();
    },
  },
};
</script>
