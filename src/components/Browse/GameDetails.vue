<template>
  <div class="divide-y">
    <div class="flex mb-2">
      <t-button @click="closeDetails" :disabled="!gameExists" icon="x">Close</t-button>
      <t-button @click="cloneGame" :disabled="!gameExists" icon="duplicate" class="mx-2">Clone</t-button>
      <t-button @click="deleteGame" :disabled="!gameExists" variant="danger" icon="trash">Delete</t-button>
      <div class="flex-grow"></div>
      <t-button variant="success">Create new</t-button>
    </div>
    <empty-game-panel v-if="!gameExists"></empty-game-panel>
    <div v-if="gameExists" class="grid grid-rows-2 gap-3">
      <div>
        <div class="flex mt-2">
          <img src="https://via.placeholder.com/600x400" class="max-w-xs object-cover" alt="game image">
          <div class="mt-4 ml-4 flex flex-col">
            <p class="font-medium text-2xl">Adventures of Superman: Part 1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem consequuntur cumque distinctio
              enim,
              est eum excepturi iure minima minus nam, natus necessitatibus nesciunt perspiciatis quidem quod
              repellendus
              veritatis voluptatum!</p>
            <div class="grid grid-cols-2 mt-4">
              <t-counter icon="heart" text="Favorite count" value="12"/>
              <t-counter icon="star" text="Rating" value="4.5"/>
              <t-counter class="mt-2" icon="play" text="Play count" value="123"/>
            </div>
            <div class="flex-grow"></div>
            <div class="flex">
              <div class="flex-grow"></div>
              <t-button icon="heart" class="mx-1">Favorite</t-button>
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
          <empty-comment-panel v-if="!game.comments"></empty-comment-panel>
        </div>
      </div>
    </div>
    <clone-game-dialog @cloned="afterClone" :game="game" v-model="dialogs.clone"></clone-game-dialog>
    <delete-game-dialog @deleted="afterDelete" :game="game" v-model="dialogs.delete"></delete-game-dialog>
    <portal to="alert">
      <t-alert variant="success" borders v-model="alerts.clone">
        <template #title>Success!</template>
        <template #text>Successfully cloned a game to your library.</template>
      </t-alert>
    </portal>
  </div>
</template>

<script>
import TButton from '../General/TButton.vue';
import GameComment from './GameComment.vue';
import TCounter from '../General/TCounter.vue';
import EmptyGamePanel from './EmptyGamePanel.vue';
import EmptyCommentPanel from './EmptyCommentPanel.vue';
import TAlert from '../General/TAlert.vue';
import DeleteGameDialog from '../MyGames/DeleteGameDialog.vue';
import CloneGameDialog from '../MyGames/CloneGameDialog.vue';

export default {
  name: 'GameDetails',
  props: {
    value: {
      type: Object,
    },
  },
  components: {
    CloneGameDialog,
    DeleteGameDialog,
    TAlert,
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
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    gameExists() {
      return JSON.stringify(this.game) !== '{}';
    },
  },
  methods: {
    closeDetails() {
      this.game = {};
    },
    cloneGame() {
      this.dialogs.clone = true;
    },
    deleteGame() {
      this.dialogs.delete = true;
    },
    afterDelete(games) {
      this.$emit('deleted', games);
    },
    afterClone(game) {
      this.$emit('cloned', game);
    },
  },
};
</script>
