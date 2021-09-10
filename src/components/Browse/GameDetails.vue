<template>
  <div class="grid grid-rows-2 gap-3">
    <div class="flex">
      <img src="https://via.placeholder.com/600x400" class="max-w-xs object-cover" alt="game image">
      <div class="mt-4 ml-4 flex flex-col">
        <p class="font-medium text-2xl">Adventures of Superman: Part 1</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur cumque distinctio enim,
          est eum excepturi iure minima minus nam, natus necessitatibus nesciunt perspiciatis quidem quod repellendus
          veritatis voluptatum!</p>
        <div class="grid grid-cols-2 mt-4">
          <t-counter icon="heart" text="Favorite count" value="12" />
          <t-counter icon="star" text="Rating" value="4.5" />
          <t-counter class="mt-2" icon="play" text="Play count" value="123" />
        </div>
        <div class="flex-grow"></div>
        <div class="flex">
          <div class="flex-grow"></div>
          <t-button icon="heart" class="mx-1">Favorite</t-button>
          <t-button icon="play" class="mx-1" variant="success">Play</t-button>
        </div>
      </div>
    </div>
    <div class="">
      <p class="font-medium">Comments:</p>
      <div class="no-scrollbar overflow-y-scroll max-h-80">
        <game-comment v-for="n in 5" :key="n"></game-comment>
      </div>
    </div>
  </div>
</template>

<script>
import TButton from '../General/TButton.vue';
import GameComment from './GameComment.vue';
import TCounter from '../General/TCounter.vue';

export default {
  name: 'GameDetails',
  components: {
    TCounter,
    GameComment,
    TButton,
  },
};
</script>
