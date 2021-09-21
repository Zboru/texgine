<template>
<div class="flex items-center">
  <h2 class="text-2xl mr-4 font-medium">Browse</h2>
  <div class="flex-grow"></div>
  <t-select class="max-w-md" :items="items" v-model="sortBy" placeholder="Sort by"></t-select>
  <t-text-field class="ml-2" placeholder="Search">
    <template #icon>
      <t-icon class="text-2xl" icon="jam:search"></t-icon>
    </template>
  </t-text-field>
</div>
</template>

<script>
import TTextField from '../General/TTextField.vue';
import TSelect from '../General/TSelect.vue';
import TIcon from '../General/TIcon.vue';
export default {
  name: 'BrowseHeader',
  components: { TIcon, TSelect, TTextField },
  data() {
    return {
      sortBy: null,
      items: [
        {
          text: 'Most played',
          value: 'most_played'
        },
        {
          text: 'Most loved',
          value: 'most_loved'
        },
        {
          text: 'Best rated',
          value: 'best_rated'
        },
      ],
    }
  }
};
</script>
