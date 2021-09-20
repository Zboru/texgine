<template>
  <div>
    <p class="text-2xl font-medium mb-2">Newest public games</p>
    <recently-edited-game>Adventures of Superman: Part 1</recently-edited-game>
    <recently-edited-game>Adventures of Superman: Part 1</recently-edited-game>
    <recently-edited-game>Labirynth of the Undead: Chapter 3</recently-edited-game>
  </div>
</template>

<script>
import RecentlyEditedGame from "./RecentlyEditedGame.vue";
export default {
  name: "NewestPublicGames",
  components: {RecentlyEditedGame}
}
</script>
