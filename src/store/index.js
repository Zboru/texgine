import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    steps: [
      // {
      //   id: 'step-1',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-2',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-3',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-4',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-5',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-6',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-7',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-8',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
      // {
      //   id: 'step-9',
      //   imageURL: null, // 'https://i.imgur.com/JOf48jt.jpg',
      //   description: 'testtesttest',
      //   choices: [],
      // },
    ],
  },
  getters: {
    getSteps: (state) => state.steps,
  },
  mutations: {
    addStep: (state, payload) => {
      state.steps.push(payload);
    },
  },
  actions: {
  },
  modules: {
  },
});
