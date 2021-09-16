<template>
  <div class="h-full flex items-center justify-center flex-col text-gray-400">
    <t-icon class="w-12 h-12" icon="folder-open"></t-icon>
    <p class="font-medium">No game selected</p>
    <p>Select a game to view it's details</p>
  </div>
</template>

<script>
import TIcon from '../General/TIcon.vue';

export default {
  name: 'EmptyGamePanel',
  components: { TIcon },
};
</script>
