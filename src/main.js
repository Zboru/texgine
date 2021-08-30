import Vue from 'vue';
import PortalVue from 'portal-vue';
import { firestorePlugin } from 'vuefire';

import router from './router';
import store from './store';

import './assets/tailwind.css';
import './assets/styles.css';

import App from './App.vue';
import { db } from './db';

Vue.use(PortalVue);
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  db,
  store,
  render: (h) => h(App),
}).$mount('#app');
