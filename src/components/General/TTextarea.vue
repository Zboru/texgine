<template>
  <div>
    <label class="text-xs text-gray-500" :for="id" v-if="label">{{label}}</label>
    <textarea class="no-scrollbar" v-if="lazy" :id="id" v-model.lazy="modelValue" :placeholder="placeholder" :class="inputClass"></textarea>
    <textarea class="no-scrollbar" v-else :id="id" v-model="modelValue" :placeholder="placeholder" :class="inputClass"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TTextArea',
  props: {
    label: String,
    placeholder: String,
    value: String,
    id: {
      type: String,
      default: `input-${Math.floor(Math.random() * 100)}`,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
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
      return 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 hover:border-gray-600 disabled:cursor-not-allowed';
    },
  },
};
</script>
