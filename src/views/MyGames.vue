<template>
  <t-container class="grid grid-cols-2 h-3/4 divide-x">
    <div class="px-3">
      <game-list-header />
      <div class="mt-2">
        <template v-for="(game, index) in games">
          <game-bar :game="game" @click="setGame(game)" class="mt-1" :key="index"></game-bar>
        </template>
      </div>
    </div>
    <div v-show="false" class="flex flex-col px-3">
      <game-actions @deleted="refreshGames" @cloned="addGame"></game-actions>
      <game-details class="flex-grow"></game-details>
    </div>
  </t-container>
</template>

<script>
import TContainer from '../components/General/TContainer.vue';
import GameBar from '../components/Browse/GameBar.vue';
import GameDetails from '../components/Browse/GameDetails.vue';
import httpManager from '../utils/httpManager';
import GameActions from '../components/MyGames/GameActions.vue';
import GameListHeader from '../components/MyGames/GameListHeader.vue';

export default {
  name: 'MyGames',
  components: {
    GameListHeader,
    GameActions,
    GameDetails,
    GameBar,
    TContainer,
  },
  created() {
    httpManager.get('http://localhost:1337/api/user/Zeu2e0b1RBZQCZllHv3VI89okkt2/games')
      .then((response) => {
        this.games = response.data.games;
      });
  },
  beforeCreate() {
    // Reset game variable in store so there's no unexpected behaviour
    this.$store.commit('setGame', {});
  },
  data() {
    return {
      sortBy: null,
      games: [],

    };
  },
  methods: {
    setGame(game) {
      this.$store.commit('setGame', game);
    },
    refreshGames(games) {
      this.games = games;
      this.selectedGame = {};
    },
    addGame(game) {
      this.$set(this.games, game.id, game);
    },
  },
};
</script>
