<template>
  <div class="border-2 p-2 rounded flex items-end hover:border-gray-500 transition cursor-pointer hover:border-2">
    <div class="titel font-medium">
      <p class="text-xl leading-5">Adventures of Superman: Part 1</p>
      <p class="text-gray-500 italic">by: zboru</p>
    </div>
    <div class="flex-grow"></div>
    <div class="flex">
      <span class="flex mx-1">
        <t-icon class="mr-1" icon="star" />
        4.5</span>
      <span class="flex mx-1"><t-icon class="mr-1" icon="heart" /> 12</span>
      <span class="flex mx-1"><t-icon class="mr-1" icon="play" /> 132</span>
    </div>
  </div>
</template>

<script>
import TIcon from '../General/TIcon.vue';

export default {
  name: 'GameBar',
  components: { TIcon },
};
</script>
