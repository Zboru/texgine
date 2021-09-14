<template>
  <div class="container max-w-6xl mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal information</h3>
          <p class="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <t-text-field placeholder="Nickname" v-model="user.email" label="E-mail address"></t-text-field>
            <t-text-field placeholder="Nickname" v-model="user.nick" label="Nickname"></t-text-field>
            <div>
              <div class="mt-1">
                <t-text-area label="About" id="about" v-model="user.about" placeholder="About me"></t-text-area>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Brief description for your profile. Content is rendered with <a class="underline"
                                                                                href="//wikipedia.org/wiki/Markdown"
                                                                                target="_blank">Markdown</a>, you can
                see available formatting
                <a class="underline" href="https://www.markdownguide.org/basic-syntax/" target="_blank">here</a>
              </p>
            </div>
            <div>
              <p class="block text-sm font-medium text-gray-700 mb-2">Preview of "About" section</p>
              <div class="border border-gray-300 rounded pb-6 pl-1 pt-1">
                <vue-markdown class="pl-2 pt-1 select-none" v-if="user.about" :source="user.about"></vue-markdown>
                <span v-if="!user.about" class="italic text-sm text-gray-400 select-none pl-2 pt-2">There's nothing to preview...</span>
              </div>
            </div>
            <!-- End of About section -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div class="mt-1 flex items-center">
                <img class="w-24 border rounded-full" :src="avatarURL" alt="">
                <div>
                  <t-text-field v-model="userAvatar.seed" class="ml-2" placeholder="Seed"></t-text-field>
                  <t-select v-model="userAvatar.service" :items="avatarServices" class="mt-1 ml-2"
                            placeholder="Select type"></t-select>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <t-button :loading="loading.save" :disabled="loading.save" @click="save" variant="success" class="inline-flex">
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
import VueMarkdown from 'vue-markdown';
import TTextField from '../General/TTextField.vue';
import TButton from '../General/TButton.vue';
import TSelect from '../General/TSelect.vue';
import TTextArea from '../General/TTextarea.vue';
import TAlert from '../General/TAlert.vue';
import httpManager from '../../utils/httpManager';

export default {
  name: 'PersonalSection',
  components: {
    TAlert,
    TTextArea,
    TSelect,
    TTextField,
    TButton,
    VueMarkdown,
  },
  data() {
    return {
      loading: {
        save: false,
      },
      alerts: {
        save: false,
      },
      avatarService: null,
      avatarSeed: null,
      avatarServices: [
        {
          text: 'micah',
          value: 'micah',
        },
        {
          text: 'bottts',
          value: 'bottts',
        },
        {
          text: 'open-peeps',
          value: 'open-peeps',
        },
        {
          text: 'croodles',
          value: 'croodles',
        },
        {
          text: 'croodles-neutral',
          value: 'croodles-neutral',
        },
        {
          text: 'pixel-art',
          value: 'pixel-art',
        },
        {
          text: 'pixel-art-neutral',
          value: 'pixel-art-neutral',
        },
        {
          text: 'initials',
          value: 'initials',
        },
        {
          text: 'identicon',
          value: 'identicon',
        },
        {
          text: 'jdenticon',
          value: 'jdenticon',
        },
        {
          text: 'gridy',
          value: 'gridy',
        },
        {
          text: 'male',
          value: 'male',
        },
        {
          text: 'female',
          value: 'female',
        },
        {
          text: 'human',
          value: 'human',
        },
      ],
      about: '',
    };
  },
  computed: {
    user: {
      get() {
        return this.$store.getters.getUser;
      },
    },
    userAvatar() {
      if (this.user.avatar) {
        return this.user.avatar;
      }
      return {};
    },
    avatarURL() {
      return `https://avatars.dicebear.com/api/${this.userAvatar.service}/${this.userAvatar.seed}.svg`;
    },
  },
  methods: {
    save() {
      this.loading.save = true;
      httpManager.post(`http://localhost:1337/api/user/${this.user.uid}`, this.user)
        .then((res) => {
          console.log(res.data);
          this.alerts.save = true;
        })
        .finally(() => {
          this.loading.save = false;
        });
    },
  },
};
</script>
