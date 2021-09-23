<template>
  <transition name="fade">
    <div v-show="show" :class="{...backgroundColors, ...border, ...borderColors}" class="flex p-4 rounded-md">
      <t-icon :class="iconColors" :icon="icon"></t-icon>
      <div class="ml-3">
        <p class="font-semibold" :class="titleColor">
          <slot name="title">Title</slot>
        </p>
        <p class="mt-1" :class="textColor">
          <slot name="text">Text</slot>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import TIcon from './TIcon.vue';

export default {
  name: 'TAlert',
  components: { TIcon },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: '',
    },
    borders: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(val) {
      if (val) {
        setTimeout(() => {
          this.show = false;
        }, 3500);
      }
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    icon() {
      switch (this.variant) {
        case 'warning':
          return 'heroicons-outline:exclamation';
        case 'success':
          return 'heroicons-outline:badge-check';
        case 'danger':
          return 'heroicons-outline:x-circle';
        default:
          return 'heroicons-outline:star';
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
        'text-yellow-400 text-2xl': this.variant === 'warning',
        'text-green-400 text-2xl': this.variant === 'success',
        'text-red-400 text-2xl': this.variant === 'danger',
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
