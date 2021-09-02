<template>
  <div class="container max-w-6xl mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <t-text-field placeholder="Nickname" v-model="user.nick" label="Nickname"></t-text-field>
            <div>
              <div class="mt-1">
                <t-text-area label="About" id="about" placeholder="About me"></t-text-area>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Brief description for your profile. Content is rendered with Markdown, you can see available formatting here
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div class="mt-1 flex items-center">
                <img class="w-24 border rounded-full" :src="avatarURL" alt="">
                <t-select v-model="userAvatar.service" :items="avatarServices" class="ml-2"
                          placeholder="Select type"></t-select>
                <t-text-field v-model="userAvatar.seed" class="ml-2" placeholder="Seed"></t-text-field>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <t-button @onClick="save" variant="success" class="inline-flex">
              Save
            </t-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import TTextField from '../components/General/TTextField.vue';
import TButton from '../components/General/TButton.vue';
import TSelect from '../components/General/TSelect.vue';
import TTextArea from '../components/General/TTextarea.vue';

export default {
  name: 'Profile',
  components: {
    TTextArea,
    TSelect,
    TTextField,
    TButton,
  },
  data() {
    return {
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
    };
  },
  computed: {
    user: {
      get() {
        return { ...this.$store.getters.getUser };
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
    async save() {
      const token = await firebase.auth().currentUser.getIdToken();
      return axios.get('http://localhost:1337/api/userData', {
        headers:
          { authorization: `Bearer ${token}` },
      })
        .then((res) => console.log(res.data));
    },
  },
};
</script>
