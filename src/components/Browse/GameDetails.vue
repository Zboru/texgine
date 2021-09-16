<template>
  <div>
    <empty-game-panel class="flex-grow" v-if="!gameExists"></empty-game-panel>
    <div v-if="gameExists" class="grid grid-rows-2 gap-3">
      <div>
        <div class="flex mt-2">
          <img src="https://via.placeholder.com/600x400" class="max-w-xs object-cover" alt="game image">
          <div class="mt-4 ml-4 flex-grow flex flex-col">
            <p class="font-medium text-2xl">{{ game.title }}</p>
            <p>{{game.description}}</p>
            <div class="grid grid-cols-2 mt-4">
              <t-counter icon="heart" text="Favorite count" :value="game.favorite_count"/>
              <t-counter icon="star" text="Rating" :value="game.rating"/>
              <t-counter class="mt-2" icon="play" text="Play count" :value="game.play_count"/>
            </div>
            <div class="flex-grow"></div>
            <div class="flex">
              <div class="flex-grow"></div>
              <t-button @click="editGame" icon="pencil" class="mx-1">Edit</t-button>
              <t-button icon="play" class="mx-1" variant="success">Play</t-button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-end mb-2">
          <p class="font-medium text-lg">Comments:</p>
          <div class="flex-grow"></div>
          <t-button icon="pencil">Add comment</t-button>
        </div>
        <div class="no-scrollbar overflow-y-scroll flex-grow">
          <game-comment v-for="(comment, index) in game.comments" :key="index"></game-comment>
          <empty-comment-panel v-if="!commentsExists"></empty-comment-panel>
        </div>
      </div>
    </div>
     </div>
</template>

<script>
import TButton from '../General/TButton.vue';
import GameComment from './GameComment.vue';
import TCounter from '../General/TCounter.vue';
import EmptyGamePanel from './EmptyGamePanel.vue';
import EmptyCommentPanel from './EmptyCommentPanel.vue';

export default {
  name: 'GameDetails',
  components: {
    EmptyCommentPanel,
    EmptyGamePanel,
    TCounter,
    GameComment,
    TButton,
  },
  data() {
    return {
      alerts: {
        clone: false,
        delete: false,
      },
      dialogs: {
        delete: false,
        clone: false,
      },
    };
  },
  computed: {
    game: {
      get() {
        return this.$store.getters.getGame;
      },
      set(value) {
        this.$store.commit('setGame', value);
      },
    },
    gameExists() {
      return JSON.stringify(this.game) !== '{}';
    },
    commentsExists() {
      return this.gameExists && this.game.comments && this.game.comments.length;
    },
  },
  methods: {
    editGame() {
      this.$router.push(`/games/${this.game.id}/edit`);
    },
  },
};
</script>
