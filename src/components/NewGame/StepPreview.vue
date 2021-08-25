<template>
  <div class="card w-80 p-4 rounded-md shadow-md">
    <div class="step-id text-sm italic text-gray-300 mb-2">{{ step.id }}</div>
    <div v-if="step.imageURL === null || step.imageURL === ''"
         class="step-image-placeholder h-32 border-2 border-dashed my-2 flex justify-center items-center text-gray-300 text-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    </div>
    <div v-else class="step-image">
      <img :src="step.imageURL" alt="Step main image">
    </div>
    <vue-markdown v-if="step.description" class="step-description break-words my-2"
                  :source="step.description"></vue-markdown>
    <div class="step-choices-preview grid grid-cols-2 gap-4">
      <div class="step-choice" v-for="(choice, index) in step.choices" :key="index">
        <div class="rounded-md shadow-md text-sm p-4 truncate">{{ choice.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'StepPreview',
  props: {
    step: Object,
  },
  components: {
    VueMarkdown,
  },
};
</script>
