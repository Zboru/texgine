<template>
  <div @click="$emit('click')" class="border-2 p-2 rounded flex flex-col items-end hover:border-gray-500 transition cursor-pointer hover:border-2">
    <div class="flex w-full">
      <span class="text-xl font-medium">{{game.title}}</span>
      <div class="flex-grow"></div>
      <span class="text-gray-300 leading-7 italic">{{game.id}}</span>
    </div>
    <div class="flex w-full">
      <span class="text-gray-400 font-medium italic">by: {{game.author}}</span>
      <div class="flex-grow"></div>
      <div class="flex">
        <t-counter dense :value="game.rating" icon="heroicons-outline:star" />
        <t-counter class="mx-2" dense :value="game.favorite_count" icon="heroicons-outline:heart" />
        <t-counter dense :value="game.play_count" icon="heroicons-outline:play" />
      </div>
    </div>
  </div>
</template>

<script>
import TCounter from '../General/TCounter.vue';
export default {
  name: 'GameBar',
  components: { TCounter },
  props: {
    game: {
      type: Object,
      default() {
        return {
          id: '3jio0dda',
          title: 'Title',
          author: 'Author',
          favorite_count: '123',
          play_count: '123',
          rating: '123',
        };
      },
    },
  },
};
</script>
