<template>
  <div class="border relative flex font-normal justify-center">
    <span class="absolute -top-3 bg-white px-3">
      <slot>
        <span v-if="text">{{ text }}</span>
        <t-icon :icon="icon" v-if="icon"></t-icon>
      </slot>
    </span>
  </div>
</template>

<script>
import TIcon from './TIcon.vue';

export default {
  name: 'TDivider',
  components: { TIcon },
  props: {
    text: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>
