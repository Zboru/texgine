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

const setUser = async function (userId, data) {
  try {
    const doc = app.firestore().collection('users').doc(userId);
    const user = await doc.update(data);
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { setUser, getGames };
