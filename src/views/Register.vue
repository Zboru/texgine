<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="text-4xl font-medium text-center">tex<span class="text-green-500">Gine</span></h1>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create new account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/login" class="font-medium text-green-600 hover:text-green-500">
            sign in to existing one
          </router-link>
        </p>
      </div>
      <div class="bg-white p-5 border flex-col flex shadow rounded">
        <t-text-field v-model="form.nick" label="Nickname"></t-text-field>
        <t-text-field v-model="form.email" label="Email address"></t-text-field>
        <t-text-field v-model="form.password" type="password" label="Password"></t-text-field>
        <t-button class="mb-3 mt-3" :disabled="loggingIn" :loading="loggingIn" @click="register" variant="success"
                  icon="heroicons-outline:lock-closed">Register
        </t-button>
        <t-divider class="my-3">Or continue with</t-divider>
        <div class="grid grid-cols-3 mt-4">
          <div @click="fbLogin"
               class="border rounded-md mr-2 flex justify-center items-center py-2 cursor-pointer hover:bg-gray-300">
            <t-icon icon="logos:facebook" class="text-2xl"></t-icon>
          </div>
          <div @click="googleLogin"
               class="border rounded-md mx-2 flex justify-center items-center py-2 cursor-pointer hover:bg-gray-300">
            <t-icon icon="grommet-icons:google" class="text-2xl"></t-icon>
          </div>
          <div @click="githubLogin"
               class="border rounded-md ml-2 flex justify-center items-center py-2 cursor-pointer hover:bg-gray-300">
            <t-icon icon="logos:github-icon" class="text-2xl"></t-icon>
          </div>
        </div>
      </div>
    </div>
    <portal to="alert">
      <t-alert borders v-model="alert.error" variant="danger" class="max-w-md">
        <template #title>Oops! Something went wrong.</template>
        <template #text>{{ alert.errorText }}</template>
      </t-alert>
      <t-alert borders v-model="alert.success" variant="success" class="max-w-md">
        <template #title>Login successful</template>
        <template #text>You will be taken to the dashboard in a moment</template>
      </t-alert>
    </portal>
  </div>
</template>

<script>
import axios from 'axios';
import TTextField from '../components/General/TTextField.vue';
import TAlert from '../components/General/TAlert.vue';
import TButton from '../components/General/TButton.vue';
import TDivider from '../components/General/TDivider.vue';
import TIcon from '../components/General/TIcon.vue';
import { auth, db } from '../db';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

export default {
  name: 'Register',
  components: {
    TIcon,
    TDivider,
    TButton,
    TAlert,
    TTextField,
  },
  data() {
    return {
      form: {
        nick: '',
        email: '',
        password: '',
      },
      loggingIn: false,
      alert: {
        success: false,
        error: false,
        errorText: false,
        title: null,
        text: null,
      },
    };
  },
  methods: {
    async checkNickname() {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/checkNickname?nick=${this.form.nick}`);
      return data;
    },
    async getUserData(uid) {
      const docRef = await doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    },
    async setUserBasicData(data) {
      const docRef = doc(db, 'users', data.user.uid);
      const avatarSeed = Math.random()
          .toString(36)
          .replace(/[^a-z0-9]+/g, '');
      await setDoc(docRef, {
        uid: data.user.uid,
        nick: `adventurer-${Math.floor(Math.random() * 9999)}`,
        email: data.user.email,
        avatar: {
          seed: avatarSeed,
          service: 'open-peeps',
          url: `https://avatars.dicebear.com/api/open-peeps/${avatarSeed}.svg`
        },
        games: {}
      });
    },
    login(provider) {
      this.loggingIn = true;
      signInWithPopup(auth, provider)
          .then(async (data) => {
            this.alert.success = true;
            this.loggingIn = false;
            const userData = await this.getUserData(data.user.uid);
            if (userData) {
              this.$store.commit('setUserData', userData);
              setTimeout(() => {
                this.$router.replace({ name: 'Dashboard' });
              }, 2500);
            } else {
              await this.setUserBasicData(data.user.uid)
              this.$store.commit('setUserData', userData);
              setTimeout(() => {
                this.$router.replace({ name: 'Dashboard' });
              }, 2500);
            }
          })
          .catch((err) => {
            console.error(err);
            this.alert.error = true;
            this.alert.errorText = err.message;
          })
          .finally(() => {
            this.loggingIn = false;
          });
    },
    githubLogin() {
      this.login(new GithubAuthProvider());
    },
    googleLogin() {
      this.login(new GoogleAuthProvider());
    },
    fbLogin() {
      this.login(new FacebookAuthProvider());
    },
    async register() {
      const { invalid } = await this.checkNickname();
      if (invalid === true) {
        this.alert.error = true;
        this.alert.errorText = 'The given nickname is already in use, enter a new one';
        return false;
      }
      await setPersistence(auth, browserSessionPersistence);
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
          .then(async (data) => {
            await this.setUserBasicData(data);
            const userData = await this.getUserData(data.user.uid);
            this.$store.commit('setUserData', userData);
            setTimeout(() => {
              this.$router.replace({ name: 'Dashboard' });
            }, 2500);
          })
          .catch((err) => {
            console.error(err);
            this.alert.error = true;
            this.alert.errorText = err.message;
          });
    }
  }
};
</script>
