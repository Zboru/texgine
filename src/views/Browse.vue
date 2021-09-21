<template>
  <t-container class="grid grid-cols-2 h-3/4 divide-x">
    <div class="px-2">
      <browse-header/>
      <div class="mt-2">
        <empty-game-list/>
        <!-- Tutaj będą gierki -->
      </div>
    </div>
    <div class="flex flex-col px-2">
      <game-actions />
      <game-details class="flex-grow"></game-details>
    </div>
  </t-container>
</template>

<script>
import TContainer from '../components/General/TContainer.vue';
import GameBar from '../components/Browse/GameBar.vue';
import GameDetails from '../components/Browse/GameDetails.vue';
import EmptyGameList from '../components/Browse/EmptyGameList.vue';
import BrowseHeader from '../components/Browse/BrowseHeader.vue';
import GameActions from '../components/Browse/GameActions.vue';

export default {
  name: 'Browse',
  components: {
    GameActions,
    BrowseHeader,
    EmptyGameList,
    GameDetails,
    GameBar,
    TContainer,
  },
  beforeCreate() {
    // Reset game variable in store so there's no unexpected behaviour
    this.$store.commit('setGame', {});
  },
};
</script>
