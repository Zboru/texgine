<template>
  <div :style="`z-index: ${zIndex}`" :class="overlayClasses" class="overlay" @click="$emit('click')"></div>
</template>

<script>
export default {
  name: 'TOverlay',
  props: {
    state: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: String,
      default: '1',
    },
  },
  computed: {
    overlayClasses() {
      return {
        invisible: this.state === false,
      };
    },
  },
};
</script>
<style>
.overlay  {
  transition: .25s all;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
}
</style>
