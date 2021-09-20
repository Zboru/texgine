<template>
  <div>
    <p class="text-2xl font-medium mb-2">Create new game</p>
    <div class="flex flex-col px-12 p-5 border-2 border-dashed">
      <p class="text-center mb-2 text-gray-400 italic">What are you waiting for? <br>Go create a new adventure</p>
      <router-link to="/create">
        <t-button variant="success">Create new game</t-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import TButton from "../General/TButton.vue";
export default {
  name: "CreateNewGame",
  components: {TButton}
}
</script>
