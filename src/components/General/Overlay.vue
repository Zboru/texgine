<template>
  <div class="overlay" @click="$emit('click')"></div>
</template>

<script>
export default {
  name: 'Overlay',
};
</script>
<style>
.overlay  {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1;
}
</style>
