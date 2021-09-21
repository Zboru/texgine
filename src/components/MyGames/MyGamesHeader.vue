<template>
  <div class="flex flex-col items-start sm:flex-row sm:items-center">
    <h2 class="text-2xl mr-4 font-medium">My games</h2>
    <div class="flex-grow"></div>
    <t-select class="max-w-md mr-2" :items="sortByItems" v-model="sortBy" placeholder="Sort by"></t-select>
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
</template>

<script>
import TTextField from '../General/TTextField.vue';
import TSelect from '../General/TSelect.vue';

export default {
  name: 'MyGamesHeader',
  components: {
    TTextField,
    TSelect,
  },
  data() {
    return {
      sortBy: null,
      sortByItems: [
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
};
</script>
