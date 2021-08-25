<template>
  <div class="card w-80 p-4 rounded-md shadow-md">
    <div class="card-heading flex justify-between items-center">
      <span>Choices</span>
      <svg @click="addChoice" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <div class="step-choices">
      <span v-for="(choice, index) in step.choices" :key="index">
        <t-accordion class="mb-1" :title="choice.id">
          <text-field label="ID" v-model="choice.id"></text-field>
          <text-area label="Text" v-model="choice.text"></text-area>
        </t-accordion>
      </span>
    </div>
  </div>
</template>

<script>
import TAccordion from '../General/TAccordion.vue';
import TextArea from '../General/TextArea.vue';
import TextField from '../General/TextField.vue';

export default {
  name: 'StepChoices',
  components: { TextField, TextArea, TAccordion },
  props: {
    value: Object,
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
    addChoice() {
      this.step.choices.push({
        id: null,
        text: null,
      });
    },
  },
};
</script>
