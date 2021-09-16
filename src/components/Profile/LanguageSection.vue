<template>
  <div class="container max-w-6xl mx-auto my-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">System language</h3>
          <p class="mt-1 text-sm text-gray-600">
            Change system language to match your preferences
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <t-select :items="languages"></t-select>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <t-button :loading="loading.save" :disabled="loading.save" @click="save" variant="success"
                      class="inline-flex">
              Save
            </t-button>
          </div>
        </div>
      </div>
    </div>
    <portal to="alert">
      <t-alert borders variant="success" v-model="alerts.save">
        <template #title>Success!</template>
        <template #text>You have successfully saved your profile settings.</template>
      </t-alert>
    </portal>
  </div>
</template>

<script>
import TAlert from '../General/TAlert.vue';
import TButton from '../General/TButton.vue';
import TSelect from '../General/TSelect.vue';

export default {
  name: 'LanguageSection',
  components: {
    TSelect,
    TButton,
    TAlert,
  },
  data() {
    return {
      loading: {
        save: false,
      },
      alerts: {
        save: false,
      },
      languages: [
        { text: 'English', value: 'english' },
        { text: 'Polski', value: 'polish' },
      ],
    };
  },
  computed: {
    randomPassword() {
      return (Math.random() + 1).toString(36)
        .substring(3);
    },
  },
  methods: {
    save() {

    },
  },
};
</script>
