<template>
  <div class="card w-80 p-4 rounded-md shadow-md">
    <div class="card-heading">Add step</div>
    <t-text-field label="ID" v-model="step.id" class="mb-2" placeholder="step-1"></t-text-field>
    <t-text-field label="Image" @input="setImageURL" class="mb-2"
                placeholder="https://i.imgur.com/JOf48jt.jpg"></t-text-field>
    <t-text-area label="Text" v-model="step.description" placeholder="You quickly grabbed your sword and..."></t-text-area>
    <div class="flex mt-4">
      <div class="flex-grow"></div>
      <t-button class="mr-2">Clear</t-button>
      <t-button @click="addStep" variant="success">Add step</t-button>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import TTextField from '../General/TTextField.vue';
import TTextArea from '../General/TTextarea.vue';
import TButton from '../General/TButton.vue';

export default {
  name: 'AddStepCard',
  props: ['value'],
  components: {
    TTextField,
    TTextArea,
    TButton,
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
    addStep() {
      this.$emit('add');
    },
  },
};
</script>
