<template>
  <div class="container mx-auto">
    <t-button class="btn">Button</t-button>
    <t-button class="btn" variant="primary">Button</t-button>
    <t-button class="btn" variant="success">Button</t-button>
    <t-button class="btn" variant="danger">Button</t-button>
    <t-button class="btn" disabled>Button</t-button>
  </div>
</template>

<script>
import TButton from '../components/General/TButton.vue';

export default {
  name: 'Dashboard',
  components: { TButton },
};
</script>

<style scoped>
  .container .btn {
    @apply mx-2 mt-2;
  }
</style>
