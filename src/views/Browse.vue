<template>
  <t-container class="grid grid-cols-2">
    <div class="flex items-center">
      <h2 class="text-2xl mx-4 font-medium">Browse</h2>
      <t-select class="max-w-md" :items="items" v-model="sortBy" placeholder="Select item"></t-select>
      <div class="flex-grow"></div>
      <t-text-field placeholder="Search">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </t-text-field>
    </div>
  </t-container>
</template>

<script>
import TContainer from '../components/General/TContainer.vue';
import TSelect from '../components/General/TSelect.vue';
import TTextField from '../components/General/TTextField.vue';

export default {
  name: 'Browse',
  components: { TTextField, TSelect, TContainer },
  data() {
    return {
      sortBy: null,
      items: [
        { text: 'Most played', value: 'most_played' },
        { text: 'Most loved', value: 'most_loved' },
        { text: 'Best rated', value: 'best_rated' },
      ],
    };
  },
};
</script>
