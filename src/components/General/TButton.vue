<template>
  <button class="t-button" :disabled="disabled" :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TButton',
  props: {
    variant: String,
    disabled: Boolean,
  },
  data() {
    return {
      buttonClasses: {
        primary: this.variant === 'primary',
        success: this.variant === 'success',
        danger: this.variant === 'danger',
        disabled: this.disabled === true,
      },
    };
  },
};
</script>

<style>
  .t-button {
    font-family: 'Rubik', sans-serif;
    border: 2px solid black;
    border-radius: 3px;
    padding: 3px 30px;
    @apply focus:ring-1 focus:ring-gray-600
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
    cursor: not-allowed;
  }
</style>
