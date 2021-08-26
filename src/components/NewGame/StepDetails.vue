<template>
  <div class="card w-80 p-4 rounded-md shadow-md">
    <div class="card-heading">Edit step</div>
    <t-text-field label="ID" v-model="step.id" class="mb-2" placeholder="step-1"></t-text-field>
    <t-text-field label="Image" @input="setImageURL" class="mb-2"
                placeholder="https://i.imgur.com/JOf48jt.jpg"></t-text-field>
    <t-text-area label="Text" v-model="step.description" placeholder="You quickly grabbed your sword and..."></t-text-area>
    <div class="flex flex-col mt-4">
      <div class="flex mb-1">
        <t-button class="mr-1" @click="clearStep" block>Clear</t-button>
        <t-button @click="deleteStep" class="ml-1" block variant="danger">Delete</t-button>
      </div>
      <t-button @click="saveStep" variant="success">Save step</t-button>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import TTextField from '../General/TTextField.vue';
import TTextArea from '../General/TTextarea.vue';
import TButton from '../General/TButton.vue';

export default {
  name: 'StepDetails',
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
    saveStep() {
      this.$emit('save');
    },
    clearStep() {
      this.step.id = null;
      this.step.imageURL = null;
      this.step.description = null;
      this.step.choices = [];
    },
    deleteStep() {
      // Send signal to remove it from canvas
      const canvas = this.$store.state.canvas;
      canvas.removeNode(this.step.internal_id);
      // Delete it from Vuex store
      this.$store.commit('removeStep', this.step);
      this.$emit('deleted');
    },
  },
};
</script>
