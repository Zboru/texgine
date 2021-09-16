<template>
  <t-container class="grid grid-cols-2 h-3/4 divide-x">
    <div class="px-3">
      <div class="flex items-center">
        <h2 class="text-2xl mr-4 font-medium">My games</h2>
        <div class="flex-grow"></div>
        <t-select class="max-w-md mr-2" :items="items" v-model="sortBy" placeholder="Sort by"></t-select>
        <t-text-field placeholder="Search">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </template>
        </t-text-field>
      </div>
      <div class="mt-2">
        <template v-for="(game, index) in games">
          <game-bar :game="game" @click="setGame(game)" class="mt-1" :key="index"></game-bar>
        </template>
      </div>
    </div>
    <div class="flex flex-col px-3">
      <game-actions @deleted="refreshGames" @cloned="addGame"></game-actions>
      <game-details class="flex-grow"></game-details>
    </div>
  </t-container>
</template>

<script>
import TContainer from '../components/General/TContainer.vue';
import TSelect from '../components/General/TSelect.vue';
import TTextField from '../components/General/TTextField.vue';
import GameBar from '../components/Browse/GameBar.vue';
import GameDetails from '../components/Browse/GameDetails.vue';
import httpManager from '../utils/httpManager';
import GameActions from '../components/MyGames/GameActions.vue';

export default {
  name: 'MyGames',
  components: {
    GameActions,
    GameDetails,
    GameBar,
    TTextField,
    TSelect,
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
  beforeDestroy() {
    // Reset game variable in store so there's no unexpected behaviour
    this.$store.commit('setGame', {});
  },
  data() {
    return {
      sortBy: null,
      games: [],
      items: [
        {
          text: 'Most played',
          value: 'most_played',
        },
        {
          text: 'Most loved',
          value: 'most_loved',
        },
        {
          text: 'Best rated',
          value: 'best_rated',
        },
      ],
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
