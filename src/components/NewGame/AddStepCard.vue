<template>
  <div class="card w-80 p-4 rounded-md shadow-md">
    <div class="card-heading">Add step</div>
    <text-field label="ID" v-model="step.id" class="mb-2" placeholder="ID"></text-field>
    <text-field label="Image" @input="setImageURL" class="mb-2"
                placeholder="https://i.imgur.com/JOf48jt.jpg"></text-field>
    <text-area label="Text" v-model="step.description" placeholder="You quickly grabbed your sword and..."></text-area>
    <div class="flex mt-2">
      <div class="flex-grow"></div>
      <t-button variant="success">Add step</t-button>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import TextField from '../General/TextField.vue';
import TextArea from '../General/TextArea.vue';
import TButton from '../General/TButton.vue';

export default {
  name: 'AddStepCard',
  props: ['value'],
  components: {
    TButton,
    TextArea,
    TextField,
  },
  computed: {
    step: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    setImageURL: debounce(function (value) {
      this.step.imageURL = value;
    }, 500),
  },
};
</script>
