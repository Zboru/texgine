import Vue from 'vue';
import App from './App.vue';

import PortalVue from 'portal-vue'
Vue.use(PortalVue)

import store from "./stores";
import router from './router';

import '@purge-icons/generated'

import './assets/css/tailwind.css'
import './assets/css/styles.css'

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

