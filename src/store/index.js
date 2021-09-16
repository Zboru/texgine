import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { app } from '../db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: {},
    steps: [],
    selectedStep: null,
    selectedStepIndex: null,
    canvas: null,
    user: {},
  },
  getters: {
    getUser: (state) => state.user,
    getGame: (state) => state.game,
    getSteps: (state) => state.steps,
    getCanvas: (state) => state.canvas,
  },
  mutations: {
    setUserData: (state, payload) => {
      localStorage.setItem('uid', payload.uid);
      state.user = { ...payload };
    },
    setGame: (state, payload) => {
      localStorage.setItem('game', payload);
      state.game = { ...payload };
    },
    addStep: (state, payload) => {
      state.steps.push(payload);
    },
    saveStep: (state, payload) => {
      const stepIndex = state.steps.findIndex((st) => st.internal_id === payload.internal_id);
      state.steps[stepIndex] = payload;
    },
    removeStep: (state, payload) => {
      const stepIndex = state.steps.findIndex((st) => st.id === payload.id);
      state.steps.splice(stepIndex, 1);
    },
  },
  actions: {
    loadUserData({
      state,
      commit,
    }) {
      if (state.user && Object.keys(state.user).length === 0 && state.user.constructor === Object) {
        firebase.getCurrentUser()
          .then((data) => {
            if (data) {
              app.firestore()
                .collection('users')
                .doc(data.uid)
                .get()
                .then((doc) => {
                  commit('setUserData', doc.data());
                });
            }
          });
      }
    },
    async loadGameData({
      state,
      commit,
    }, gameId) {
      if (state.game && Object.keys(state.game).length === 0 && state.game.constructor === Object) {
        const doc = await app.firestore()
          .collection('users')
          .doc(state.user.uid)
          .get();
        const userData = doc.data();
        const game = userData.games[gameId];
        commit('setGame', game);
      }
    },
  },
});
