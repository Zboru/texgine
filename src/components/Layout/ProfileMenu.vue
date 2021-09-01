<template>
  <div class="relative inline-block text-left">
    <div>
      <button type="button" @focus="state = true" @focusout="state =false" tabindex="-1"
              class="ml-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <span class="sr-only">Open user menu</span>
        <img class="h-8 w-8 border rounded-full"
             :src="user.avatar.url"
             alt="">
      </button>
    </div>
    <div @mousedown.prevent="1"
         class="origin-top-right absolute right-0 mt-2 w-56 z-50 transition ease-out duration-100 transform opacity-0 scale-95 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
         role="menu" :class="menuClasses" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <p class="px-4 py-2 text-sm font-normal">
        Signed in as:
        <t-skeleton width="w-3/4" v-if="!user.email"></t-skeleton>
        <span class="font-medium" v-else><br>{{ user.email }}</span>
        <t-skeleton v-if="!user.nick" width="w-1/2"></t-skeleton>
        <span v-else class="text-xs text-gray-400 italic font-medium"><br>{{ user.nick }}</span>
      </p>
      <hr>
      <div>
        <div @click="hideMenu">
          <router-link to="/profile"
                       class="text-gray-700 font-normal block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900">
            Account settings
          </router-link>
        </div>
        <button @click="logout"
                class="text-red-400 w-full text-left font-normal block px-4 py-2 text-sm hover:bg-gray-100 hover:text-red-900"
                role="menuitem" tabindex="-1"
                id="menu-item-3">Sign out
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import TSkeleton from '../General/TSkeleton.vue';

export default {
  name: 'ProfileMenu',
  components: { TSkeleton },
  data() {
    return {
      state: false,
    };
  },
  computed: {
    menuClasses() {
      return {
        'transform opacity-0 scale-95': !this.state,
        'transform opacity-100 scale-100': this.state,
      };
    },
    user() {
      return { ...this.$store.getters.getUser };
    },
  },
  methods: {
    hideMenu() {
      this.state = false;
      this.$nextTick(() => {
        document.querySelector('#user-menu-button').blur();
      });
    },
    logout() {
      firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: 'Login',
          });
        });
    },
  },
};
</script>
