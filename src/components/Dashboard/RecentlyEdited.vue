<template>
  <div class="bg-white p-2 rounded-lg shadow-md">
    <p class="text-2xl font-medium mb-2">Recently edited</p>
    <recently-edited-game>Adventures of Superman: Part 1</recently-edited-game>
    <recently-edited-game>Adventures of Superman: Part 1</recently-edited-game>
    <recently-edited-game>Labirynth of the Undead: Chapter 3</recently-edited-game>
  </div>
</template>

<script>
import RecentlyEditedGame from "./RecentlyEditedGame.vue";
export default {
  name: "RecentlyEdited",
  components: {RecentlyEditedGame},
}
</script>
