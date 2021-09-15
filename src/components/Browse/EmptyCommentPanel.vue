<template>
  <div class="border-2 border-dashed h-4/5 flex items-center justify-center flex-col text-gray-400">
    <t-icon icon="puzzle"></t-icon>
    <p class="font-medium">Nobody commented this game yet.</p>
    <p class="italic">Be first to do so!</p>
  </div>
</template>

<script>
import TIcon from '../General/TIcon.vue';

export default {
  name: 'EmptyCommentPanel',
  components: { TIcon },
};
</script>
