<template>
  <div>
    <label :for="inputID" v-if="label">
      <span class="text-xs select-none text-gray-500">{{ label }}</span>
    </label>
    <div class="relative">
      <div class="absolute bg-white text-gray-300 pointer-events-none absolute top-2.5 right-2">
        <slot name="icon"></slot>
      </div>
      <input v-if="lazy" :type="type"
             autocomplete="off"
             :disabled="disabled"
             @keydown="$emit('keydown', $event)"
             @focus="$emit('focus')"
             @blur="$emit('blur')"
             :id="inputID"
             v-model.lazy="modelValue" :placeholder="placeholder"
             :class="inputClass">
      <input v-if="!lazy" :type="type"
             autocomplete="off"
             :disabled="disabled"
             @keydown="$emit('keydown', $event)"
             @focus="$emit('focus')"
             @blur="$emit('blur')"
             :id="inputID"
             v-model="modelValue" :placeholder="placeholder"
             :class="inputClass">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TTextField',
  props: {
    label: String,
    placeholder: String,
    value: String,
    disabled: Boolean,
    type: {
      type: String,
      default() {
        return 'text';
      },
    },
    lazy: {
      type: Boolean,
      default: false,
    },
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
    inputClass() {
      return 'block w-full px-3 py-2 pr-10 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 hover:border-gray-600 disabled:cursor-not-allowed';
    },
  },

};
</script>
