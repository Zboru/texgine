<template>
  <div class="animate-pulse my-1 rounded bg-gray-300 h-4" :class="skeletonClasses"></div>
</template>

<script>
export default {
  name: 'TSkeleton',
  props: {
    width: {
      type: String,
      default: 'w-full',
    },
  },
  computed: {
    skeletonClasses() {
      return {
        [this.width]: this.width,
      };
    },
  },
};
</script>
