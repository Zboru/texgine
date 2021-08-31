<template>
  <button @click="onClick" class="t-button" :disabled="disabled" :class="buttonClasses">
    <t-icon class="mr-2" :icon="icon"></t-icon>
    <slot></slot>
  </button>
</template>

<script>
import TIcon from './TIcon.vue';

export default {
  name: 'TButton',
  components: { TIcon },
  props: {
    variant: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      buttonClasses: {
        primary: this.variant === 'primary',
        success: this.variant === 'success',
        danger: this.variant === 'danger',
        disabled: this.disabled === true,
        'block w-full': this.block === true,
      },
    };
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>

<style>
.t-button {
  font-family: 'Rubik', sans-serif;
  border: 2px solid black;
  border-radius: 3px;
  padding: 3px 30px 3px 20px;
  @apply flex focus:ring-1 focus:ring-gray-600
}

.t-button.primary {
  background: #111827;
  border-color: #272e45;
  color: white;
  @apply focus:ring-gray-600
}

.t-button.success {
  background: #3FA372;
  border-color: #307553;
  color: white;
  @apply focus:ring-green-600
}

.t-button.success:hover {
  background: #308960;
}

.t-button.danger {
  background: #F55459;
  border-color: #A53C40;
  color: white;
  @apply focus:ring-red-600
}

.t-button.danger:hover {
  background: #d53a3e;
}

.t-button.disabled {
  border-color: #CDCDCD;
  color: #CDCDCD;
  background: white;
  cursor: not-allowed;
}
</style>
