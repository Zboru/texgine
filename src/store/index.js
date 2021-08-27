import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    steps: [],
    selectedStep: null,
    selectedStepIndex: null,
    canvas: null,
  },
  getters: {
    getSteps: (state) => state.steps,
    getCanvas: (state) => state.canvas,
  },
  mutations: {
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
  actions: {},
  modules: {},
});
