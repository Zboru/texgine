<template>
  <div v-if="show">
    <overlay @click="show=false"/>
    <div class="h-screen w-screen flex justify-center items-center">
      <div class="flex justify-center items-start">
        <step-details @deleted="show = false" @save="saveStep" class="mx-1" v-model="step"></step-details>
        <step-preview class="mx-1" :step="step"></step-preview>
        <step-choices class="mx-1" v-model="step"></step-choices>
      </div>
    </div>
  </div>
</template>

<script>
import Overlay from '../General/TOverlay.vue';
import StepDetails from './StepDetails.vue';
import StepPreview from './StepPreview.vue';
import StepChoices from './StepChoices.vue';

export default {
  name: 'StepDetailsDialog',
  components: {
    StepChoices,
    StepPreview,
    StepDetails,
    Overlay,
  },
  props: ['value', 'step'],
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
      this.$emit('save');
      this.show = false;
    },
  },
};
</script>
