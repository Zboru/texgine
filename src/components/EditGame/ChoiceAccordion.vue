<template>
  <t-accordion>
    <template #header>
      <span class="text-gray-500">{{ choice.id }}</span>
      <div class="flex text-gray-400">
        <svg @click.stop="deleteChoice" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </template>
    <template #default>
      <t-text-field label="ID" v-model="choice.id"></t-text-field>
      <t-text-area label="Text" v-model="choice.text"></t-text-area>
      <t-autocomplete :value="choice.linkTo" @select="selectStep" label="Link to step" placeholder="step-1" display="id" :items="steps" search-by="id"></t-autocomplete>
    </template>
  </t-accordion>
</template>

<script>
import TAccordion from '../General/TAccordion.vue';
import TTextField from '../General/TTextField.vue';
import TTextArea from '../General/TTextarea.vue';
import TAutocomplete from '../General/TAutocomplete.vue';

export default {
  name: 'ChoiceAccordion',
  components: {
    TAutocomplete,
    TTextArea,
    TTextField,
    TAccordion,
  },
  props: {
    choice: Object,
  },
  computed: {
    steps() {
      return this.$store.getters.getSteps;
    },
  },
  methods: {
    deleteChoice() {
      this.$emit('delete', this.choice);
    },
    selectStep(step) {
      if (step && step.id) {
        this.choice.linkTo = step.id;
      }
    },
  },
};
</script>
