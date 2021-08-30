import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Dashboard from '../views/Dashboard.vue';
import CreateNewGame from '../views/CreateNewGame.vue';
import Browse from '../views/Browse.vue';
import Auth from '../views/Auth.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/create',
    name: 'CreateNewGame',
    component: CreateNewGame,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth,
    meta: {
      plainLayout: true,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('Login');
  } else {
    next();
  }
});

export default router;
