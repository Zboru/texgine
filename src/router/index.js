import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import EditGame from '../views/EditGame.vue';
import Browse from '../views/Browse.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import MyGames from '../views/MyGames.vue';
import {app} from '../db'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      plainLayout: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      plainLayout: true,
    },
  },
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
    path: '/my-games',
    name: 'MyGames',
    component: MyGames,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/games/:id/edit',
    name: 'EditGame',
    component: EditGame,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      plainLayout: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !await app.getCurrentUser()) {
    next('/login');
  }
  next();
});

export default router;
