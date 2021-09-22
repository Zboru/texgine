<template>
  <div class="container mx-auto bg-white rounded-2xl shadow-md mt-6 flex p-2">
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
        <button @click="saveGame" class="border rounded py-1 px-2 mx-2 flex" id="save">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span class="ml-2">Save</span>
        </button>
        <button @click="loadCanvas" class="border rounded py-1 px-2 mx-2 flex" id="load">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span class="ml-2">Load</span>
        </button>
      </div>
    </div>
    <game-details-sidebar v-model="game" />
    <portal to="dialog">
      <step-details-dialog @save="saveStep" :step="selectedStep" v-model="dialogs.step_details"/>
    </portal>
  </div>
</template>

<script>
import StepDetailsDialog from '../components/EditGame/StepDetailsDialog.vue';
import Canvas from '../canvas/canvas';
import GameDetailsSidebar from '../components/EditGame/GameDetailsSidebar.vue';
import httpManager from '../utils/httpManager';

export default {
  name: 'EditGame',
  components: { GameDetailsSidebar, StepDetailsDialog },
  data() {
    return {
      canvas: new Canvas(),
      sidebar: false,
      dialogs: {
        step_details: false,
      },
      selectedStep: {},
    };
  },
  computed: {
    game: {
      get() {
        return this.$store.getters.getGame;
      },
      set(value) {
        this.$store.commit('setGame', value);
      }
    }
  },
  watch: {
    game: {
      handler() {
        this.saveGameFirebase();
      },
      deep: true,
    },
  },
  mounted() {
    this.canvas.init();
    // Save canvas object to store to use its functions everywhere
    this.$store.state.canvas = this.canvas;
    this.loadGame();
    this.registerListeners();
  },
  methods: {
    /*
      Load game from Vuex or Firebase if there was direct connection
     */
    loadGame() {
      const game = this.$store.getters.getGame;
      if (Object.keys(game).length !== 0) {
        this.game = game;
        if (JSON.stringify(this.game.canvas) !== "{}") {
          this.canvas.canvas.loadFromJSON(this.game.canvas, () => {
            this.canvas.canvas.renderAll();
          });
        }
      } else {
        this.$store.dispatch('loadGameData', this.$route.params.id).then(() => {
          this.game = this.$store.getters.getGame;
          this.canvas.canvas.loadFromJSON(this.game.canvas, () => {
            this.canvas.canvas.renderAll();
          });
        });
      }
    },
    /*
      Everytime game properties change, save game in cloud
     */
    saveGameFirebase() {
      httpManager.put(`${import.meta.env.VITE_API_URL}/games/${this.game.id}`, this.game);
    },
    saveCanvas() {
      const canvasJSON = this.canvas.canvas.toJSON(['internal_id', 'id', 'hasControls', 'hasBorders', 'moveCursor', 'hoverCursor']);
      canvasJSON.objects = canvasJSON.objects.filter(obj => obj.type !== 'line');
      this.game.canvas = JSON.stringify(canvasJSON);
      this.saveGameFirebase();
    },
    registerListeners() {
      // Show dialog after double-clicking node
      this.canvas.vue.$on('editNode', (node) => {
        console.log(node);
        this.selectedStep = { ...this.game.steps[node.internal_id] };
        this.dialogs.step_details = true;
      });
      // Show dialog after placing new node
      this.canvas.vue.$on('createNode', (node) => {
        // Create new step object
        const step = {
          id: node.id,
          internal_id: node.id,
          imageURL: null,
          description: null,
          choices: [],
        };
        // Save it in Vuex store
        this.$store.commit('saveStep', step);

        // Select created step
        this.selectedStep = { ...this.game.steps[step.id] };
        // Save canvas to Firebase
        this.saveCanvas();
        this.dialogs.step_details = true;
      });
      this.canvas.vue.$on('nodeMoved', (node) => {
        this.saveCanvas();
      })
    },
    createRectangle() {
      this.canvas.createRect(9999, 9999, '#faf', 'placeholder');
      this.canvas.isAddingRect = true;
    },
    saveStep() {
      // Update step in Vuex store
      this.$store.commit('saveStep', this.selectedStep);
      // Change canvas node id
      this.canvas.setNodeID(this.selectedStep.id);
      // Save canvas to Firebase
      this.saveCanvas();
      // Draw connections between steps
      // this.makeConnections();
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
    saveGame() {
      const canvasJSON = JSON.stringify(this.canvas.canvas.toJSON());
      const gameJSON = JSON.stringify(this.game);
      localStorage.setItem('canvas', canvasJSON);
      localStorage.setItem('game', gameJSON);
      console.log(canvasJSON, gameJSON);
    },
    loadCanvas() {
      // parse the data into the canvas
      const json = localStorage.getItem('canvas');
      this.game = localStorage.getItem('game');
      this.canvas.canvas.loadFromJSON(json);

      // re-render the canvas
      this.canvas.canvas.renderAll();

      // optional
    },
  },
};
</script>
