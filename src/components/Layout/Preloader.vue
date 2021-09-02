<template>
  <div class="flex justify-center mt-20">
    <t-icon icon="cog" class="animate-spin-slow text-gray-300 w-24 h-24"></t-icon>
  </div>
</template>

<script>
import TIcon from '../General/TIcon.vue';

export default {
  name: 'Preloader',
  components: { TIcon },
};
</script>
