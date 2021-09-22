<template>
  <div class="card w-80 p-4 rounded-md shadow-md">
    <div class="card-heading flex justify-between items-center">
      <div>Preview <span v-if="step.id" class="step-id text-sm italic text-gray-300">/ {{ step.id }}</span></div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
      </svg>
    </div>
    <div v-if="step.imageURL === null || step.imageURL === ''"
         class="step-image-placeholder h-32 border-2 border-dashed my-2 flex justify-center items-center text-gray-300 text-2xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    </div>
    <div v-else class="step-image ">
      <img :src="step.imageURL" class="rounded-md" alt="Step main image">
    </div>
    <vue-markdown v-if="step.description" class="step-description break-words my-2"
                  :source="step.description"></vue-markdown>
    <div class="step-choices-preview grid grid-cols-2 gap-4 mt-4">
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
