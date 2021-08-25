import Vue from 'vue';
import PortalVue from 'portal-vue';

import router from './router';
import store from './store';

import './assets/tailwind.css';
import './assets/styles.css';

import App from './App.vue';

Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
