<template>
  <t-sidebar position="left" v-model="sidebar">
    <t-text-field lazy v-model="game.title" label="Title" placeholder="Adventures of..."></t-text-field>
    <t-text-area lazy v-model="game.description" label="Description" placeholder="Once upon a time..."></t-text-area>
    <t-select placeholder="Select language" label="Language"></t-select>
    <t-select v-model="game.category" :items="categories" placeholder="Select category" label="Category"></t-select>
    <t-checkbox v-model="game.public" label="Game is visible to everyone" class="mt-2"></t-checkbox>
    <t-file-input v-model="game.cover_art" label="Cover art (max. 10mb)" input-label="Upload an image"></t-file-input>
    <img :src="game.cover_art" alt="">
  </t-sidebar>
</template>

<script>
import TSidebar from '../General/TSidebar.vue';
import TTextField from '../General/TTextField.vue';
import TTextArea from '../General/TTextarea.vue';
import TCheckbox from '../General/TCheckbox.vue';
import TSelect from '../General/TSelect.vue';
import TFileInput from '../General/TFileInput.vue';

export default {
  name: 'GameDetailsSidebar',
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    TFileInput,
    TSelect,
    TCheckbox,
    TTextArea,
    TTextField,
    TSidebar,
  },
  data() {
    return {
      sidebar: false,
      categories: [
        { text: 'Adventure', value: 'adventure' },
        { text: 'Romance', value: 'romance' },
        { text: 'Educational', value: 'educational' },
        { text: 'Historical', value: 'historical' },
        { text: 'Horror', value: 'horror' },
        { text: 'Mystery', value: 'mystery' },
        { text: 'Puzzle', value: 'puzzle' },
        { text: 'RPG', value: 'rpg' },
        { text: 'Sci-Fi', value: 'scf-fi' },
        { text: 'Seasonal', value: 'seasonal' },
        { text: 'Simulation', value: 'simulation' },
        { text: 'Surreal', value: 'surreal' },
        { text: 'Other', value: 'other' },
      ],
    };
  },
  computed: {
    game: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
