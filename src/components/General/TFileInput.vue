<template>
  <div>
    <label class="text-xs text-gray-500" :for="randomID">{{label}}</label>
    <label class='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-green-300 group'>
      <div class='flex flex-col items-center justify-center pt-7'>
        <t-icon icon="photograph" class="w-10 h-10 text-green-500 group-hover:text-green-600"></t-icon>
        <p class='text-sm text-gray-400 group-hover:text-green-500 pt-1 tracking-wider'>{{inputLabel}}</p>
      </div>
      <input @change="encodePhoto" type='file' :id="randomID" class="hidden" />
    </label>
  </div>
</template>

<script>
import TIcon from './TIcon.vue';

export default {
  name: 'TFileInput',
  components: { TIcon },
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: 'File input',
    },
    inputLabel: {
      type: String,
      default: 'Upload a file',
    },
  },
  computed: {
    file: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    randomID() {
      return `fileinput-${Math.floor(Math.random() * 100)}`;
    },
  },
  methods: {
    encodePhoto(event) {
      const photo = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.file = reader.result;
      };
      reader.readAsDataURL(photo);
    },
  },
};
</script>
