<template>
  <div @click="$emit('click')">
    <span class="iconify" :data-icon="icon"></span>
  </div>
</template>

<script>

const icons = {};

export default {
  name: 'TIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
