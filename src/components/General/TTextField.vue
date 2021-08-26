<template>
  <div class="focus-within:text-blue-300">
    <label :for="inputID" v-if="label"><span class="text-xs text-gray-500">{{ label }}</span>
      <div class="absolute text-gray-500 pointer-events-none w-8 h-8 absolute top-8 transform translate-y-0.5 right-1">
        <slot name="icon"></slot>
      </div>
    <input autocomplete="off" @keydown="$emit('keydown', $event)" @focus="$emit('focus')" @blur="$emit('blur')" :id="inputID"
           v-model="modelValue" type="text" :placeholder="placeholder"
           class="block w-full px-3 py-2 text-black placeholder-gray-400
          transition duration-100 ease-in-out bg-white border border-gray-300
           rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500
            focus:outline-none focus:ring-opacity-50 disabled:opacity-50
             disabled:cursor-not-allowed">
    </label>
  </div>
</template>

<script>
export default {
  name: 'TTextField',
  props: {
    label: String,
    placeholder: String,
    value: String,
  },
  data() {
    return {
      inputID: `input-${Math.floor(Math.random() * 100)}`,
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
