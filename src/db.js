import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyAVuPiv73Y-fqVtSbw4jehk4QfrH001-4Y',
    authDomain: 'texgine-87f65.firebaseapp.com',
    projectId: 'texgine-87f65',
    storageBucket: 'texgine-87f65.appspot.com',
    messagingSenderId: '224006389193',
    appId: '1:224006389193:web:c65d7b6c7f773028d9fc18',
    measurementId: 'G-778EX2D662',
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// Method for user authorization
app.getCurrentUser = () => new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
    }, reject);
});

export {app, auth, db}
