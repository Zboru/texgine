<template>
  <div class="md:pt-6">
    <nav class="bg-white shadow-md max-w-7xl mx-auto rounded-b-2xl md:rounded-2xl">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button type="button"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg @click="toggleMenu(true)" :class="{'hidden': this.menu}" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg @click="toggleMenu(false)" :class="{'hidden': !this.menu}" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <p class="font-medium text-2xl">tex<span class="text-green-500">Gine</span></p>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4 navbar-links">
                <router-link to="/" class="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</router-link>
                <router-link to="/browse"
                             class="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Browse</router-link>
                <router-link to="/my-games"
                             class="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My
                  games</router-link>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button"
                    class="p-1 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </button>

            <!-- Profile dropdown -->
            <profile-menu />
          </div>
        </div>
      </div>
      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-show="menu" class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 navbar-links">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <router-link @click.native="toggleMenu(false)" to="/" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</router-link>
          <router-link @click.native="toggleMenu(false)" to="/browse"
             class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Browse</router-link>
          <router-link @click.native="toggleMenu(false)" to="/my-games"
             class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My games</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import ProfileMenu from './ProfileMenu.vue';

export default {
  name: 'Navigation',
  components: { ProfileMenu },
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    toggleMenu(value) {
      this.menu = value;
    },
  },
};
</script>
