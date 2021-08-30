import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAVuPiv73Y-fqVtSbw4jehk4QfrH001-4Y',
  authDomain: 'texgine-87f65.firebaseapp.com',
  projectId: 'texgine-87f65',
  storageBucket: 'texgine-87f65.appspot.com',
  messagingSenderId: '224006389193',
  appId: '1:224006389193:web:c65d7b6c7f773028d9fc18',
  measurementId: 'G-778EX2D662',
};

// Method for user authorization
firebase.getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    unsubscribe();
    resolve(user);
  }, reject);
});

// Get a Firestore instance
// eslint-disable-next-line import/prefer-default-export
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();
