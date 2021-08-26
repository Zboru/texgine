<template>
  <div v-if="show">
    <overlay @click="show=false"/>
    <div class="h-screen w-screen flex justify-center items-center">
      <div class="flex justify-center items-start">
        <add-step-card @add="saveStep" class="mx-1" v-model="step"></add-step-card>
        <step-preview class="mx-1" :step="step"></step-preview>
        <step-choices class="mx-1" v-model="step"></step-choices>
      </div>
    </div>
  </div>
</template>

<script>
import Overlay from '../General/Overlay.vue';
import AddStepCard from './AddStepCard.vue';
import StepPreview from './StepPreview.vue';
import StepChoices from './StepChoices.vue';

export default {
  name: 'StepDetailsDialog',
  components: {
    StepChoices,
    StepPreview,
    AddStepCard,
    Overlay,
  },
  props: ['value', 'steps'],
  data() {
    return {
      step: {
        id: null,
        imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
        description: null,
        choices: [],
      },
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    saveStep() {
      this.$store.commit('addStep', this.step);
      this.show = false;
    },
  },
};
</script>
