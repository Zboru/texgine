<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
             alt="Workflow"/>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            create new one here
          </router-link>
        </p>
      </div>
      <div class="bg-white p-5 border flex-col flex shadow rounded">
        <t-text-field v-model="form.email" label="Email address"></t-text-field>
        <t-text-field v-model="form.password" type="password" label="Password"></t-text-field>
        <div class="flex items-center justify-between my-6">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
            <label for="remember-me" class="ml-2 block select-none text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium select-none text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>
        <button type="submit" @click="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-6 w-6 h-5 w-5 text-indigo-500 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
</svg>
            </span>
          Sign in
        </button>
        <div class="relative mt-4">
          <hr>
        </div>
        <div class="grid grid-cols-3 mt-4">
          <div class="border rounded mx-4 text-center">
            fb
          </div>
          <div class="border rounded mx-4 text-center">google</div>
          <div class="border rounded mx-4 text-center">github</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import TTextField from '../components/General/TTextField.vue';

export default {
  name: 'Login',
  components: { TTextField },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          console.log(data);
          this.$store.commit('setUserData', data);
          this.$router.replace({ name: 'Dashboard' });
        })
        .catch((err) => {
          console.log(err);
          this.error = err.message;
        });
    },
  },
};
</script>
