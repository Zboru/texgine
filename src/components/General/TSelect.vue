<template>
  <div class="relative">
    <div @focus="state = true" @focusout="state =false" tabindex="-1" class="t-select"
         :class="selectClasses">
      <span class="pointer-events-none select-none">{{ selectText }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6 t-select-icon" :class="{'select-active': state}"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
    <div v-if="state && items.length"
         class="autocomplete-list max-h-36 overflow-y-scroll absolute w-full shadow rounded no-scrollbar w-100">
      <div @mouseover="listPosition = index" @mousedown.prevent="selectItem(item)" class="border p-2 hover:bg-gray-200 cursor-pointer"
           :class="{'bg-gray-300 active-list-item': listPosition === index, 'bg-white': listPosition !== index}"
           v-for="(item, index) in items"
           :key="index">{{ item[itemText] }}
      </div>
    </div>
    <div @mousedown.prevent="test" class="absolute w-full shadow rounded-b w-100"
         v-if="state && !items.length">
      <div class="border bg-white p-2 flex justify-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
        </svg>
        <span class="ml-2">No data</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TSelect',
  props: {
    label: String,
    placeholder: String,
    value: [Object, Array, Number, String],
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    itemText: {
      type: String,
      default() {
        return 'text';
      },
    },
    itemValue: {
      type: String,
      default() {
        return 'value';
      },
    },
  },
  data() {
    return {
      inputID: Math.floor(Math.random() * 100),
      state: false,
      selectedItem: null,
      listPosition: 0,
    };
  },
  computed: {
    selectClasses() {
      return {
        'rounded-md': !this.state,
        'rounded-t': this.state,
        'text-gray-400': this.selectedItem === null,
      };
    },
    selectText() {
      if (this.selectedItem !== null) {
        return this.selectedItem[this.itemText];
      }
      return this.placeholder;
    },
    item: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    test() {
      console.log('test');
    },
    selectItem(item) {
      document.querySelector('.t-select').blur();
      this.selectedItem = item;
      this.item = item[this.itemValue];
    },
  },
};
</script>
<style>
.t-select {
  @apply border border-gray-300 transition w-full px-4 py-2 flex justify-between
  hover:border-gray-600 hover:text-gray-600 focus:border-gray-500 focus:ring-2 focus:ring-gray-500
  focus:outline-none focus:ring-opacity-50
}

.t-select-icon {
  color: inherit;
}

.select-active {
  @apply transition transform rotate-180
}
</style>
