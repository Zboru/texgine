<template>
  <div :class="{...backgroundColors, ...border, ...borderColors}" class="flex p-4 rounded">
    <t-icon :color="iconColors" :icon="icon"></t-icon>
    <div class="ml-3">
      <span class="font-semibold" :class="titleColor">
        <slot name="title">Title</slot>
      </span>
      <p class="mt-1" :class="textColor">
        <slot name="text">Text</slot>
      </p>
    </div>
  </div>
</template>

<script>
import TIcon from './TIcon.vue';

export default {
  name: 'TAlert',
  components: { TIcon },
  props: {
    variant: {
      type: String,
      default: '',
    },
    borders: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      switch (this.variant) {
        case 'warning':
          return 'exclamation';
        case 'success':
          return 'badge-check';
        case 'danger':
          return 'x-circle';
        default:
          return 'star';
      }
    },
    border() {
      return {
        'border-l-4': this.borders,
      };
    },
    borderColors() {
      return {
        'border-green-400': this.variant === 'success',
        'border-yellow-400': this.variant === 'warning',
        'border-red-400': this.variant === 'danger',
      };
    },
    backgroundColors() {
      return {
        'bg-yellow-50': this.variant === 'warning',
        'bg-green-50': this.variant === 'success',
        'bg-red-50': this.variant === 'danger',
      };
    },
    iconColors() {
      return {
        'text-yellow-400': this.variant === 'warning',
        'text-green-400': this.variant === 'success',
        'text-red-400': this.variant === 'danger',
      };
    },
    titleColor() {
      return {
        'text-yellow-800': this.variant === 'warning',
        'text-green-800': this.variant === 'success',
        'text-red-800': this.variant === 'danger',
      };
    },
    textColor() {
      return {
        'text-yellow-700': this.variant === 'warning',
        'text-green-700': this.variant === 'success',
        'text-red-700': this.variant === 'danger',
      };
    },
  },
};
</script>
