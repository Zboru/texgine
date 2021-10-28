import Vue from 'vue'
import Vuex from 'vuex'
import {app, db} from "../db";
import {doc, getDoc} from "firebase/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listGame: {},
        game: {},
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
        saveStep: (state, payload) => {
            state.game.steps[payload.internal_id] = payload;
        },
        removeStep: (state, payload) => {
            delete state.game.steps[payload.internal_id]
        },
    },
    actions: {
        async loadUserData({state, commit}) {
            if (state.user && Object.keys(state.user).length === 0 && state.user.constructor === Object) {
                const user = await app.getCurrentUser();
                if (user) {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    commit('setUserData', {
                      ...docSnap.data(),
                      provider:user.providerData[0].providerId
                    });
                }
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
