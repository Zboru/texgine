<template>
  <div class="border-2 rounded-md border-dashed flex flex-col justify-center items-center italic py-4">
    <t-icon class="text-gray-400 text-5xl" icon="mdi:puzzle-outline"></t-icon>
    <p class="text-gray-500">You have not created any game</p>
    <p class="text-gray-500">Create a new adventure in just a few minutes!</p>
  </div>
</template>

<script>
import TIcon from '../General/TIcon.vue';

export default {
  name: 'EmptyGameList',
  components: { TIcon },
};
</script>
