<template>
  <div>
    <label class="text-xs text-gray-500" :for="inputID" v-if="label">{{ label }}</label>
    <select @click="$emit('click')" @focus="$emit('focus')"
      class="block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400
     transition duration-100 ease-in-out bg-white border border-gray-300
     rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500
      focus:outline-none focus:ring-opacity-50 disabled:opacity-50
       disabled:cursor-not-allowed"></select>
  </div>
</template>

<script>
export default {
  name: 'TSelect',
  props: {
    label: String,
    placeholder: String,
  },
  data() {
    return {
      inputID: Math.floor(Math.random() * 100),
    };
  },
};
</script>
