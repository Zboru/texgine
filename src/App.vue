<template>
  <div id="app">
    <navigation v-if="!$route.meta.plainLayout" />
    <router-view v-if="dataLoaded || $route.meta.plainLayout"/>
    <preloader v-if="!dataLoaded"></preloader>
    <portal-target class="dialog-portal" name="dialog" multiple></portal-target>
    <portal-target class="alert-portal" name="alert" multiple></portal-target>
  </div>
</template>

<script>
import Navigation from './components/Layout/Navigation.vue';
import Preloader from './components/Layout/Preloader.vue';

export default {
  components: { Preloader, Navigation },
  beforeCreate() {
    this.$store.dispatch('loadUserData');
  },
  computed: {
    dataLoaded() {
      return JSON.stringify(this.$store.getters.getUser) !== '{}';
    },
  },
};
</script>
