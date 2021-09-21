<template>
  <div class="flex border-b pb-2">
    <t-button @click="closeDetails" :disabled="!gameExists" icon="heroicons-outline:x">Close</t-button>
    <t-button @click="cloneGame" :disabled="!gameExists" icon="heroicons-outline:duplicate" class="mx-2">Clone</t-button>
    <div class="flex-grow"></div>
    <t-button @click="createNewGame" variant="success">Create new</t-button>
    <clone-game-dialog @cloned="afterClone" :game="game" v-model="dialogs.clone"></clone-game-dialog>
  </div>
</template>

<script>
import TButton from '../General/TButton.vue';
import httpManager from '../../utils/httpManager';
import CloneGameDialog from '../MyGames/CloneGameDialog.vue';

export default {
  name: 'GameActions',
  components: { CloneGameDialog, TButton },
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
        return this.$store.getters.getGame;
      },
      set(value) {
        this.$store.commit('setGame', value);
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
    afterDelete(games) {
      this.$emit('deleted', games);
    },
    afterClone(game) {
      this.$emit('cloned', game);
    },
  },
};
</script>
