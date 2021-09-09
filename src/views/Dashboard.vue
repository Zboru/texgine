<template>
  <div class="container mx-auto">
    <t-button class="btn" @click="auth">Auth</t-button>
    <t-button class="btn" @click="apiVer" variant="primary">Button</t-button>
    <t-button class="btn" variant="success">Button</t-button>
    <t-button class="btn" variant="danger">Button</t-button>
    <t-button class="btn" disabled>Button</t-button>
  </div>
</template>

<script>
import axios from 'axios';
import TButton from '../components/General/TButton.vue';
import httpManager from '../utils/httpManager';

export default {
  name: 'Dashboard',
  components: { TButton },
  methods: {
    auth() {
      httpManager.get('http://localhost:1337/api/').then((res) => {
        console.log(res.data);
      });
    },
    apiVer() {
      axios.get('http://localhost:1337/api/', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style scoped>
  .container .btn {
    @apply mx-2 mt-2;
  }
</style>
