// const admin = require('../firebase-admin');
const app = require('../firebase');

const getGames = async function (userId) {
  try {
    const doc = app.firestore().collection('users').doc(userId);
    const user = await doc.get();
    return user.data();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const setUser = function () {
  return true; // admin.auth().verifyIdToken();
};

module.exports = { setUser, getGames };
