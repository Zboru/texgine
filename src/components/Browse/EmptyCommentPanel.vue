<template>
  <div class="border-2 border-dashed h-full flex items-center justify-center select-none py-4 flex-col text-gray-400">
    <t-icon class="text-5xl" icon="mdi:message-question-outline"></t-icon>
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
