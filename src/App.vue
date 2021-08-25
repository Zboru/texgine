<template>
  <div id="app">
    <navigation />
    <router-view/>
    <portal-target class="dialog-portal" name="dialog" multiple></portal-target>
  </div>
</template>

<script>
import Navigation from './components/Layout/Navigation.vue';

export default {
  components: { Navigation },
};
</script>
