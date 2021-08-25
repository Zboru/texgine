<template>
  <div class="focus-within:text-blue-300">
    <label class="text-xs text-gray-500" :for="inputID" v-if="label">{{label}}</label>
    <input :id="inputID" v-model="modelValue" type="text" :placeholder="placeholder"
           class="block w-full px-3 py-2 text-black placeholder-gray-400
          transition duration-100 ease-in-out bg-white border border-gray-300
           rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500
            focus:outline-none focus:ring-opacity-50 disabled:opacity-50
             disabled:cursor-not-allowed">
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    label: String,
    placeholder: String,
    value: String,
  },
  data() {
    return {
      inputID: Math.floor(Math.random() * 100),
    };
  },
  computed: {
    modelValue: {
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
