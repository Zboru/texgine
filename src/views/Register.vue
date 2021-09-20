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
                  icon="lock-closed">Register
        </t-button>
        <t-divider class="my-3">Or continue with</t-divider>
        <div class="grid grid-cols-3 mt-4">
          <div @click="fbLogin"
               class="border rounded-md mr-2 flex justify-center items-center py-2 cursor-pointer hover:bg-gray-300">
            <facebook-icon class="w-6 h-6 rounded"></facebook-icon>
          </div>
          <div @click="googleLogin"
               class="border rounded-md mx-2 flex justify-center items-center py-2 cursor-pointer hover:bg-gray-300">
            <google-icon class="w-6 h-6"></google-icon>
          </div>
          <div @click="githubLogin"
               class="border rounded-md ml-2 flex justify-center items-center py-2 cursor-pointer hover:bg-gray-300">
            <github-icon class="w-6 h-6"></github-icon>
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
import 'firebase/app';
import axios from 'axios';
import { app } from '../db';
import TTextField from '../components/General/TTextField.vue';
import TButton from '../components/General/TButton.vue';
import TDivider from '../components/General/TDivider.vue';
import TAlert from '../components/General/TAlert.vue';

export default {
  name: 'Register',
  components: {
    TAlert,
    TDivider,
    TButton,
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
      const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/checkNickname?nick=${this.form.nick}`);
      return data;
    },
    async userDataExists(uid) {
      const doc = await app.firestore().collection('users')
        .doc(uid)
        .get();
      return doc.data() !== undefined;
    },
    login(provider) {
      this.loggingIn = true;
      firebase.auth()
        .signInWithPopup(provider)
        .then(async (data) => {
          this.alert.success = true;
          this.loggingIn = false;
          const dataFlag = await this.userDataExists(data.user.uid);
          if (dataFlag) {
            app.firestore().collection('users')
              .doc(data.user.uid)
              .get()
              .then((doc) => {
                this.$store.commit('setUserData', doc.data());
                setTimeout(() => {
                  this.$router.replace({ name: 'Dashboard' });
                }, 2500);
              });
          } else {
            await app.firestore().collection('users')
              .doc(data.user.uid)
              .set({
                uid: data.user.uid,
                nick: `adventurer-${Math.floor(Math.random() * 9999)}`,
                email: data.user.email,
              });
            setTimeout(() => {
              this.$router.replace({ name: 'Dashboard' });
            }, 2500);
          }
        }).catch((err) => {
          this.alert.error = true;
          this.alert.errorText = err.message;
        })
        .finally(() => {
          this.loggingIn = false;
        });
    },
    githubLogin() {
      this.login(new firebase.auth.GithubAuthProvider());
    },
    googleLogin() {
      this.login(new firebase.auth.GoogleAuthProvider());
    },
    fbLogin() {
      this.login(new firebase.auth.FacebookAuthProvider());
    },
    async register() {
      const { invalid } = await this.checkNickname();
      if (invalid === true) {
        this.alert.error = true;
        this.alert.errorText = 'The given nickname is already in use, enter a new one';
        return false;
      }
      firebase.auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase.auth()
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then((data) => {
              app.firestore().collection('users').doc(data.user.uid).set({
                uid: data.user.uid,
                nick: this.form.nick,
                email: data.user.email,
              });
              this.$router.replace({ name: 'Dashboard' });
            })
            .catch((err) => {
              this.alert.error = true;
              this.alert.errorText = err.message;
            });
        });
      return true;
    },
  },
};
</script>
