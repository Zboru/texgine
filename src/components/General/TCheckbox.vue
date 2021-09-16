<template>
  <div class="flex items-center">
    <input :id="randomID" v-model="state" name="checkbox" type="checkbox"
           class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
    <label :for="randomID" class="ml-2 block select-none text-sm text-gray-900">
      {{label}}
    </label>
  </div>
</template>

<script>
export default {
  name: 'TCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Checkbox',
    },
  },
  computed: {
    randomID() {
      return `checkbox-${Math.floor(Math.random() * 100)}`;
    },
    state: {
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
