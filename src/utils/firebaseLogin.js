import {
  browserLocalPersistence,
  browserSessionPersistence, createUserWithEmailAndPassword,
  setPersistence, signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../db';
import axios from 'axios';

async function getUserData(uid, db) {
  const docRef = await doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

async function setUserBasicData(db, data, nick = null) {
  const docRef = doc(db, 'users', data.user.uid);
  const avatarSeed = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]+/g, '');
  await setDoc(docRef, {
    uid: data.user.uid,
    nick: nick ?? `adventurer-${Math.floor(Math.random() * 9999)}`,
    email: data.user.email,
    avatar: {
      seed: avatarSeed,
      service: 'open-peeps',
      url: `https://avatars.dicebear.com/api/open-peeps/${avatarSeed}.svg`
    },
    games: {}
  });
}

async function checkNickname(nick) {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/checkNickname?nick=${nick}`);
  return data;
}

export async function emailRegister(vm, form) {
  const { invalid } = await checkNickname(form.nick);
  if (invalid === true) {
    vm.alert.error = true;
    vm.alert.errorText = 'The given nickname is already in use, enter a new one';
    return false;
  }
  await setPersistence(auth, browserSessionPersistence);
  createUserWithEmailAndPassword(auth, form.email, form.password)
    .then(async (data) => {
      await setUserBasicData(db, data, form.nick);
      const userData = await getUserData(data.user.uid, db);
      vm.$store.commit('setUserData', {
        ...userData,
        provider: data.providerId
      });
      setTimeout(() => {
        vm.$router.replace({ name: 'Dashboard' });
      }, 2500);
    })
    .catch((err) => {
      console.error(err);
      vm.alert.error = true;
      vm.alert.errorText = err.message;
    });
}

export async function emailLogin(vm, remember, email, password) {
  vm.loggingIn = true;
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  signInWithEmailAndPassword(auth, email, password)
    .then(async (data) => {
      vm.alert.success = true;
      vm.loggingIn = false;
      const userData = await getUserData(data.user.uid, db);
      vm.$store.commit('setUserData', {
        ...userData,
        provider: data.providerId
      });
      setTimeout(() => {
        vm.$router.replace({ name: 'Dashboard' });
      }, 2500);
    })
    .catch((err) => {
      console.error(err);
      vm.alert.error = true;
      vm.alert.errorText = err.message;
    })
    .finally(() => {
      vm.loggingIn = false;
    });
}

export function providerLogin(vm, provider, auth, db) {
  vm.loggingIn = true;
  signInWithPopup(auth, provider)
    .then(async (data) => {
      // Show success login alert
      vm.alert.success = true;
      // Disable button loading
      vm.loggingIn = false;
      // Check if user has data in database
      const userData = await getUserData(data.user.uid, db);
      if (userData) {
        // Store user data and move him to dashboard
        vm.$store.commit('setUserData', {
          ...userData,
          provider: data.providerId
        });
        setTimeout(() => {
          vm.$router.replace({ name: 'Dashboard' });
        }, 2500);
      } else {
        // Set basic data in user collection
        await setUserBasicData(db, data);
        // Get new user data
        const userData = await getUserData(data.user.uid, db);
        // Store user data and move him to dashboard
        vm.$store.commit('setUserData', {
          ...userData,
          provider: data.providerId
        });
        setTimeout(() => {
          vm.$router.replace({ name: 'Dashboard' });
        }, 2500);
      }
    })
    .catch((err) => {
      console.error(err);
      vm.alert.error = true;
      vm.alert.errorText = err.message;
    })
    .finally(() => {
      vm.loggingIn = false;
    });
}

