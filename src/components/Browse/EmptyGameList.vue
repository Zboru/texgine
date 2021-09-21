<template>
  <div class="border-2 rounded-md border-dashed flex flex-col justify-center items-center select-none italic py-4">
    <t-icon class="text-gray-400 text-5xl" icon="mdi:puzzle-outline"></t-icon>
    <p class="text-gray-500">There's no public game yet!</p>
    <p class="text-gray-500">Be first to create something special!</p>
  </div>
</template>

<script>
import TIcon from '../General/TIcon.vue';
export default {
  name: 'EmptyGameList',
  components: { TIcon }
};
</script>
