<template>
  <t-container class="flex">
    <create-new-game />
    <recently-edited />
    <newest-public-games />
  </t-container>
</template>

<script>
import TButton from "../components/General/TButton.vue";
import TContainer from "../components/General/TContainer.vue";
import RecentlyEdited from "../components/Dashboard/RecentlyEdited.vue";
import NewestPublicGames from "../components/Dashboard/NewestPublicGames.vue";
import CreateNewGame from "../components/Dashboard/CreateNewGame.vue";
export default {
  name: 'Dashboard',
  components: {CreateNewGame, NewestPublicGames, RecentlyEdited, TContainer, TButton},
};
</script>

