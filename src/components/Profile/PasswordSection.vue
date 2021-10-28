<template>
  <div class="container max-w-6xl mx-auto my-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Authentication settings</h3>
          <p class="mt-1 text-sm text-gray-600">
            Set your new strong password here. You can't change password if you're using provider to log in.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <t-text-field :disabled="usingProvider" placeholder="*********" v-model="password" label="New password"></t-text-field>
            <div>
              <div class="mt-1">
                <t-text-field :disabled="usingProvider" label="Confirm password" v-model="confirmPassword" placeholder="*********"></t-text-field>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <t-button :loading="loading.save" :disabled="loading.save || usingProvider" @click="save" variant="success"
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
import TTextField from '../General/TTextField.vue';

export default {
  name: 'PasswordSection',
  components: {
    TTextField,
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
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    randomPassword() {
      return (Math.random() + 1).toString(36)
        .substring(3);
    },
    usingProvider() {
      return this.$store.getters.getUser.provider !== null;
    }
  },
  methods: {
    save() {

    },
  },
};
</script>
