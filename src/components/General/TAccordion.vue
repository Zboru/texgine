<template>
  <div>
    <div class="text-md transition-all border bg-white items-center rounded-lg">
      <div @click="state = !state" class="flex justify-between cursor-pointer p-2 hover:bg-gray-100 hover:bg-opacity-50"
           :class="{'border-b': state}">
        <slot name="header"></slot>
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
