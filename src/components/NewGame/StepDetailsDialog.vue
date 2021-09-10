<template>
  <div v-if="show">
    <t-overlay z-index="5" :state="show" @click="show=false"/>
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
import StepDetails from './StepDetails.vue';
import StepPreview from './StepPreview.vue';
import StepChoices from './StepChoices.vue';
import TOverlay from '../General/TOverlay.vue';

export default {
  name: 'StepDetailsDialog',
  components: {
    TOverlay,
    StepChoices,
    StepPreview,
    StepDetails,
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
