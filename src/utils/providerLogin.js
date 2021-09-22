import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

async function getUserData(uid, db) {
  const docRef = await doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

async function setUserBasicData(db, data) {
  const docRef = doc(db, 'users', data.user.uid);
  const avatarSeed = Math.random()
    .toString(36)
    .replace(/[^a-z0-9]+/g, '');
  await setDoc(docRef, {
    uid: data.user.uid,
    nick: `adventurer-${Math.floor(Math.random() * 9999)}`,
    email: data.user.email,
    avatar: {
      seed: avatarSeed,
      service: 'open-peeps',
      url: `https://avatars.dicebear.com/api/open-peeps/${avatarSeed}.svg`
    },
    games: {}
  });
}

export default function login(vm, provider, auth, db) {
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
        vm.$store.commit('setUserData', userData);
        setTimeout(() => {
          vm.$router.replace({ name: 'Dashboard' });
        }, 2500);
      } else {
        // Set basic data in user collection
        await setUserBasicData(db, data)
        // Get new user data
        const userData = await getUserData(data.user.uid, db);
        // Store user data and move him to dashboard
        vm.$store.commit('setUserData', userData);
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
