<template>
<div>
  <div
    class="text-md transition-all border bg-white items-center rounded-lg"
    role="alert"
  >
    <div @click="state = !state" class="flex justify-between cursor-pointer p-2 hover:bg-gray-100 hover:bg-opacity-50" :class="{'border-b': state}">
      {{ title || "" }}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <div v-show="state" class="p-2">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TAccordion',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
  data() {
    return {
      state: false,
    };
  },
};
</script>
