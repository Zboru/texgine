const { app, db } = require('../firebase');
const {doc, getDoc, updateDoc} = require('firebase/firestore');

const getGames = async function (userId) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const setUser = async function (userId, data) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    await updateDoc(userRef, data);
    return userSnap.data();
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { setUser, getGames };
