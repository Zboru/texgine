<template>
  <div>
    <empty-game-panel class="flex-grow" v-if="!gameExists"></empty-game-panel>
    <div v-if="gameExists" class="flex flex-col">
      <div>
        <div class="flex my-2">
          <div class="border-2 border-dashed w-56 h-64 flex items-center justify-center">
            <t-icon icon="heroicons-outline:photograph" class="text-3xl text-gray-400"></t-icon>
          </div>
<!--      <img src="https://via.placeholder.com/600x400" class="max-w-xs object-cover" alt="game image">-->
          <div class="mt-4 ml-4 flex-grow flex flex-col">
            <p class="font-medium text-2xl">{{ game.title }}</p>
            <p>{{ game.description }}</p>
            <div class="grid grid-cols-2 mt-4">
              <t-counter icon="heroicons-outline:heart" text="Favorite count" :value="game.favorite_count"/>
              <t-counter icon="heroicons-outline:star" text="Rating" :value="game.rating"/>
              <t-counter class="mt-2" icon="heroicons-outline:play" text="Play count" :value="game.play_count"/>
            </div>
            <div class="flex-grow"></div>
            <div class="flex">
              <div class="flex-grow"></div>
              <t-button @click="editGame" icon="heroicons-outline:pencil-alt" class="mx-1">Edit</t-button>
              <t-button icon="heroicons-outline:play" class="mx-1" variant="success">Play</t-button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col h-96">
        <div class="flex items-end mb-2">
          <p class="font-medium text-lg">Comments:</p>
          <div class="flex-grow"></div>
          <t-button @click="dialogs.comment = true" icon="bx:bx-message-square-add">Add comment</t-button>
        </div>
        <div class="no-scrollbar overflow-y-scroll">
          <game-comment v-for="(comment, index) in game.comments" :comment="comment" :key="index"></game-comment>
          <empty-comment-panel v-show="!commentsExists"></empty-comment-panel>
        </div>
      </div>
    </div>
    <add-comment-dialog v-model="dialogs.comment"></add-comment-dialog>
  </div>
</template>

<script>
import TButton from '../General/TButton.vue';
import GameComment from './GameComment.vue';
import TCounter from '../General/TCounter.vue';
import EmptyGamePanel from './EmptyGamePanel.vue';
import EmptyCommentPanel from './EmptyCommentPanel.vue';
import AddCommentDialog from '../Shared/Game/AddCommentDialog.vue';
import TIcon from '../General/TIcon.vue';

export default {
  name: 'GameDetails',
  components: {
    TIcon,
    AddCommentDialog,
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
        comment: false,
      },
    };
  },
  computed: {
    game: {
      get() {
        return this.$store.getters.getListGame;
      },
      set(value) {
        this.$store.commit('setListGame', value);
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
      this.$store.commit('setGame', this.game);
      this.$router.push(`/games/${this.game.id}/edit`);
    },
  },
};
</script>
