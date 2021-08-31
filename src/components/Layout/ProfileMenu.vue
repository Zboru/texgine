<template>
  <div class="relative inline-block text-left">
    <div>
      <button type="button" @focus="state = true" @focusout="state =false" tabindex="-1"
              class="bg-gray-800 ml-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <span class="sr-only">Open user menu</span>
        <img class="h-8 w-8 rounded-full"
             src="https://avatars.dicebear.com/api/micah/21p.svg"
             alt="">
      </button>
    </div>
    <div @mousedown.prevent="1"
      class="origin-top-right absolute right-0 mt-2 w-56 z-50 transition ease-out duration-100 transform opacity-0 scale-95 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
       role="menu" :class="menuClasses" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <p class="px-4 py-2 text-sm font-normal">Signed in as: <br>
      <span class="font-medium">{{userEmail}}</span></p>
      <hr>
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a href="#" class="text-gray-700 font-normal block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabindex="-1"
           id="menu-item-0">Account settings</a>
        <button @click="logout" class="text-red-400 font-normal block px-4 py-2 text-sm hover:bg-gray-100 hover:text-red-900" role="menuitem" tabindex="-1"
           id="menu-item-3">Sign out</button>

      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'ProfileMenu',
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
    userEmail() {
      return this.$store.getters.getUser.email;
    },
  },
  methods: {
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
