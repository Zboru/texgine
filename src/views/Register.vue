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
import TTextField from '../components/General/TTextField.vue';
import TAlert from '../components/General/TAlert.vue';
import TButton from '../components/General/TButton.vue';
import TDivider from '../components/General/TDivider.vue';
import TIcon from '../components/General/TIcon.vue';
import { auth, db } from '../db';
import { providerLogin, emailRegister } from '../utils/firebaseLogin';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
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
    githubLogin() {
      providerLogin(this, new GithubAuthProvider(), auth, db);
    },
    googleLogin() {
      providerLogin(this, new GoogleAuthProvider(), auth, db);
    },
    fbLogin() {
      providerLogin(this, new FacebookAuthProvider(), auth, db);
    },
    register() {
      emailRegister(this, this.form)
    }
  }
};
</script>
