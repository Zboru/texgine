<template>
  <button @click="onClick" class="t-button" :disabled="disabled" :class="buttonClasses">
    <template v-if="!loading">
      <t-icon class="mr-2" v-if="icon" :icon="icon"></t-icon>
      <slot></slot>
    </template>
    <template v-else>
      <t-icon class="animate-spin-slow" icon="cog"></t-icon>
    </template>
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      return {
        primary: this.variant === 'primary',
        success: this.variant === 'success',
        danger: this.variant === 'danger',
        disabled: this.disabled,
        'block w-full': this.block === true,
      };
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style>
.t-button {
  font-family: 'Rubik', sans-serif;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  /*padding: 5px 20px 5px 20px;*/
  @apply flex focus:ring-1 focus:ring-gray-600 py-1.5 px-8
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
