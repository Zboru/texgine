<template>
  <div class="flex border-b pb-2">
    <t-button @click="closeDetails" :disabled="!gameExists" icon="heroicons-outline:x">Close</t-button>
    <t-button @click="cloneGame" :disabled="!gameExists" icon="heroicons-outline:duplicate" class="mx-2">Clone</t-button>
    <t-button @click="deleteGame" :disabled="!gameExists" variant="danger" icon="heroicons-outline:trash">Delete</t-button>
    <div class="flex-grow"></div>
    <t-button @click="createNewGame" variant="success" icon="heroicons-outline:plus">Create new</t-button>
    <clone-game-dialog @cloned="afterClone" :game="game" v-model="dialogs.clone"></clone-game-dialog>
    <delete-game-dialog @deleted="afterDelete" :game="game" v-model="dialogs.delete"></delete-game-dialog>
  </div>
</template>

<script>
import TButton from '../General/TButton.vue';
import httpManager from '../../utils/httpManager';
import CloneGameDialog from './CloneGameDialog.vue';
import DeleteGameDialog from './DeleteGameDialog.vue';

export default {
  name: 'GameActions',
  components: { DeleteGameDialog, CloneGameDialog, TButton },
  data() {
    return {
      dialogs: {
        clone: false,
        delete: false,
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
  },
  methods: {
    createNewGame() {
      httpManager.post(`${import.meta.env.VITE_API_URL}/games`).then((response) => {
        this.$store.commit('setGame', response.data);
        this.$router.push(`/games/${response.data.id}/edit`);
      });
    },
    closeDetails() {
      this.game = {};
    },
    cloneGame() {
      this.dialogs.clone = true;
    },
    deleteGame() {
      this.dialogs.delete = true;
    },
    afterDelete(gameId) {
      this.$emit('deleted', gameId);
    },
    afterClone(game) {
      this.$emit('cloned', game);
    },
  },
};
</script>
