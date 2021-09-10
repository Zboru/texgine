<template>
  <div class="border-2 p-2 rounded flex items-end hover:border-gray-500 transition cursor-pointer hover:border-2">
    <div class="titel font-medium">
      <p class="text-xl leading-5">Adventures of Superman: Part 1</p>
      <p class="text-gray-500 italic">by: zboru</p>
    </div>
    <div class="flex-grow"></div>
    <div class="flex">
      <t-counter dense value="4.5" icon="star" />
      <t-counter class="mx-2" dense value="12" icon="heart" />
      <t-counter dense value="132" icon="play" />
    </div>
  </div>
</template>

<script>
import TCounter from '../General/TCounter.vue';

export default {
  name: 'GameBar',
  components: { TCounter },
};
</script>
