<template>
  <div v-if="show">
    <overlay @click="show=false"/>
    <div class="flex h-screen w-screen justify-center items-center">
      <add-step-card class="mx-1" v-model="step"></add-step-card>
      <step-preview class="mx-1" :step="step"></step-preview>
      <step-choices v-model="step"></step-choices>
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
  props: ['value'],
  data() {
    return {
      step: {
        id: 'Test-1',
        imageURL: 'https://i.imgur.com/JOf48jt.jpg',
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
  methods: {},
};
</script>
