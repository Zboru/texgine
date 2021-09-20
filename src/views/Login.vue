<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="text-4xl font-medium text-center">tex<span class="text-green-500">Gine</span></h1>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/register" class="font-medium text-green-600 hover:text-green-500">
            create new one here
          </router-link>
        </p>
      </div>
      <div class="bg-white p-5 border flex-col flex shadow rounded">
        <t-text-field v-model="form.email" label="Email address"></t-text-field>
        <t-text-field v-model="form.password" type="password" label="Password"></t-text-field>
        <div class="flex items-center justify-between my-6">
          <div class="flex items-center">
            <input id="remember-me" v-model="form.remember" name="remember-me" type="checkbox"
                   class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
            <label for="remember-me" class="ml-2 block select-none text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium select-none text-green-600 hover:text-green-500">
              Forgot your password?
            </a>
          </div>
        </div>
        <t-button class="mb-3" :disabled="loggingIn" :loading="loggingIn" @click="submit" variant="success"
                  icon="heroicons-outline:lock-closed">Sign in
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
import TTextField from '../components/General/TTextField.vue';
import TAlert from '../components/General/TAlert.vue';
import TButton from '../components/General/TButton.vue';
import TDivider from '../components/General/TDivider.vue';
import TIcon from "../components/General/TIcon.vue";
import {auth, db} from '../db';
import {setDoc, doc, getDoc} from 'firebase/firestore'
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence
} from 'firebase/auth'

export default {
  name: 'Login',
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
        email: '',
        password: '',
        remember: false,
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
    async getUserData(uid) {
      const docRef = await doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
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
                this.$router.replace({name: 'Dashboard'});
              }, 2500);
            } else {
              const docRef = doc(db, 'users', data.user.uid);
              await setDoc(docRef, {
                uid: data.user.uid,
                nick: `adventurer-${Math.floor(Math.random() * 9999)}`,
                email: data.user.email,
              })
              setTimeout(() => {
                this.$router.replace({name: 'Dashboard'});
              }, 2500);
            }
          }).catch((err) => {
        console.error(err)
        this.alert.error = true;
        this.alert.errorText = err.message;
      }).finally(() => {
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
    async submit() {
      this.loggingIn = true;
      await setPersistence(auth, this.form.remember ? browserLocalPersistence : browserSessionPersistence);
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
          .then(async (data) => {
            this.alert.success = true;
            this.loggingIn = false;
            const userData = await this.getUserData(data.user.uid);
            if (userData) {
              this.$store.commit('setUserData', userData);
              setTimeout(() => {
                this.$router.replace({name: 'Dashboard'});
              }, 2500);
            } else {
              const docRef = doc(db, 'users', data.user.uid);
              await setDoc(docRef, {
                uid: data.user.uid,
                nick: `adventurer-${Math.floor(Math.random() * 9999)}`,
                email: data.user.email,
              })
              setTimeout(() => {
                this.$router.replace({name: 'Dashboard'});
              }, 2500);
            }
          }).catch((err) => {
        console.error(err)
        this.alert.error = true;
        this.alert.errorText = err.message;
      }).finally(() => {
        this.loggingIn = false;
      });
    },
  },
};
</script>
