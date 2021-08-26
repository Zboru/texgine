<template>
  <div class="relative">
    <text-field @keydown="handleKeyboard" @focus="showList = true" @blur="showList = false" v-model="search"
                :label="label" :placeholder="placeholder">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </template>
    </text-field>
    <div v-if="showList && filteredItems.length"
         class="autocomplete-list max-h-36 overflow-y-scroll absolute w-full shadow rounded no-scrollbar w-100">
      <div @mousedown.prevent="selectItem(item)" class="border p-2 hover:bg-gray-300 cursor-pointer"
           :class="{'bg-gray-300 active-list-item': listPosition === index, 'bg-white': listPosition !== index}"
           v-for="(item, index) in filteredItems"
           :key="index">{{ item[display] }}
      </div>
    </div>
    <div class="autocomplete-list max-h-36 overflow-y-scroll absolute w-full shadow rounded no-scrollbar w-100"
         v-if="showList && !filteredItems.length && search !== null && search !== ''">
      <div class="border bg-white p-2 flex justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="ml-2">No data</span>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from './TTextField.vue';

export default {
  name: 'TAutocomplete',
  components: { TextField },
  props: {
    label: String,
    placeholder: String,
    items: Array,
    searchBy: String,
    display: String,
  },
  data() {
    return {
      search: null,
      showList: false,
      listPosition: 0,
      autocompleteInput: false,
    };
  },
  computed: {
    filteredItems() {
      if (this.items && this.items.length && this.search !== '' && this.search !== null) {
        return this.items.filter((i) => {
          const regexp = new RegExp(this.search, 'g');
          return regexp.test(i[this.searchBy]);
        });
      }
      return [];
    },
  },
  watch: {
    filteredItems() {
      this.listPosition = 0;
      this.$nextTick(() => {
        this.scrollToItem();
      });
    },
  },
  methods: {
    handleKeyboard(event) {
      const KEY_DOWN = 40;
      const KEY_UP = 38;
      const ENTER = 13;
      if (event.keyCode === KEY_DOWN || event.keyCode === KEY_UP || event.keyCode === ENTER) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (this.showList === false) {
        this.showList = true;
      }
      if (event.keyCode === KEY_DOWN) {
        if (this.listPosition < this.filteredItems.length - 1) {
          this.listPosition += 1;
        }
        this.scrollToItem();
      } else if (event.keyCode === KEY_UP) {
        if (this.listPosition > 0) {
          this.listPosition -= 1;
        }
        this.scrollToItem();
      } else if (event.keyCode === ENTER) {
        const item = this.filteredItems[this.listPosition];
        this.selectItem(item);
      }
    },
    scrollToItem() {
      const item = document.querySelector('.active-list-item');
      if (item) {
        item.scrollIntoView({ behavior: 'smooth' });
      }
    },
    selectItem(item) {
      console.log(item);
      this.$emit('select', item);
      this.search = item[this.display];
      this.showList = false;
      this.listPosition = 0;
    },
  },
};
</script>
