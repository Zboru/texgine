<template>
  <t-container class="grid grid-cols-2 h-3/4 divide-x">
    <div class="px-2">
      <my-games-header />
      <div class="mt-2">
        <empty-game-list v-show="!gamesExist" />
        <template v-if="gamesExist" v-for="(game, index) in games">
          <game-bar :game="game" @click="setListGame(game)" class="mt-1" :key="index"></game-bar>
        </template>
      </div>
    </div>
    <div class="flex flex-col px-2">
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
import MyGamesHeader from '../components/MyGames/MyGamesHeader.vue';
import EmptyGameList from '../components/MyGames/EmptyGameList.vue';

export default {
  name: 'MyGames',
  components: {
    EmptyGameList,
    MyGamesHeader,
    GameActions,
    GameDetails,
    GameBar,
    TContainer,
  },
  created() {
    httpManager.get(`${import.meta.env.VITE_API_URL}/user/${this.user.uid}/games`)
      .then((response) => {
        this.games = response.data.games;
      });
  },
  beforeCreate() {
    // Reset game variable in store so there's no unexpected behaviour
    this.$store.commit('setListGame', {});
  },
  data() {
    return {
      sortBy: null,
      games: {},
    };
  },
  methods: {
    setListGame(game) {
      this.$store.commit('setListGame', game);
    },
    refreshGames(games) {
      this.games = games;
      this.selectedGame = {};
    },
    addGame(game) {
      this.$set(this.games, game.id, game);
      this.setListGame(game);
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    gamesExist() {
      return Object.keys(this.games).length > 0
    }
  }
};
</script>
