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
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <t-text-field v-model="user.nick" label="Nickname"></t-text-field>
              </div>
            </div>

            <div>
              <label for="about" class="block text-sm font-medium text-gray-700">
                About
              </label>
              <div class="mt-1">
                <textarea id="about" name="about" rows="3"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="you@example.com"/>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <div class="mt-1 flex items-center">
                <img class="w-24 border rounded-full" :src="avatarURL" alt="">
                <t-select v-model="user.avatar.service" :items="avatarServices" class="ml-2" placeholder="Select type"></t-select>
                  <t-text-field v-model="user.avatar.seed" class="ml-2" placeholder="Seed"></t-text-field>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <t-button variant="success" class="inline-flex">
              Save
            </t-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TTextField from '../components/General/TTextField.vue';
import TButton from '../components/General/TButton.vue';
import TSelect from '../components/General/TSelect.vue';

export default {
  name: 'Profile',
  components: { TSelect, TTextField, TButton },
  data() {
    return {
      avatarService: null,
      avatarSeed: null,
      avatarServices: [
        { text: 'micah', value: 'micah' },
        { text: 'bottts', value: 'bottts' },
        { text: 'open-peeps', value: 'open-peeps' },
        { text: 'croodles', value: 'croodles' },
        { text: 'croodles-neutral', value: 'croodles-neutral' },
        { text: 'pixel-art', value: 'pixel-art' },
        { text: 'pixel-art-neutral', value: 'pixel-art-neutral' },
        { text: 'initials', value: 'initials' },
        { text: 'identicon', value: 'identicon' },
        { text: 'jdenticon', value: 'jdenticon' },
        { text: 'gridy', value: 'gridy' },
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' },
        { text: 'human', value: 'human' },
      ],
    };
  },
  computed: {
    user: {
      get() {
        return { ...this.$store.getters.getUser };
      },
    },
    avatarURL() {
      return `https://avatars.dicebear.com/api/${this.user.avatar.service}/${this.user.avatar.seed}.svg`;
    },
  },
};
</script>
