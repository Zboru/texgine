import Vue from 'vue'
import Vuex from 'vuex'
import {app, db} from "../db";
import {doc, getDoc} from "firebase/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listGame: {},
        game: {},
        steps: [],
        selectedStep: null,
        selectedStepIndex: null,
        canvas: null,
        user: {},
    },
    getters: {
        getUser: (state) => state.user,
        getListGame: (state) => state.listGame,
        getGame: (state) => state.game,
        getSteps: (state) => state.steps,
        getCanvas: (state) => state.canvas,
    },
    mutations: {
        setUserData: (state, payload) => {
            localStorage.setItem('uid', payload.uid);
            state.user = {...payload};
        },
        setGame: (state, payload) => {
            localStorage.setItem('game', payload);
            state.game = {...payload};
        },
        setListGame: (state, payload) => {
            localStorage.setItem('listGame', payload);
            state.listGame = {...payload};
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
        async loadUserData({state, commit}) {
            if (state.user && Object.keys(state.user).length === 0 && state.user.constructor === Object) {
                const user = await app.getCurrentUser();
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                commit('setUserData', docSnap.data());
            }
        },
        async loadGameData({state, commit}, gameId) {
            if (state.game && Object.keys(state.game).length === 0 && state.game.constructor === Object) {
                const docRef = doc(db, 'users', state.user.uid);
                const docSnap = await getDoc(docRef);
                const userData = docSnap.data();
                const game = userData.games[gameId];
                commit('setGame', game);
            }
        },
    },
});
