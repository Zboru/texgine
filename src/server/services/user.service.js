const { db } = require('../firebase');
const {
  doc,
  getDoc,
  updateDoc
} = require('firebase/firestore');

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
    // Change author nick in games
    let userData = userSnap.data();
    const games = userData.games;
    if (games && Object.keys(games).length > 0) {
      for (let game in games) {
        if (games.hasOwnProperty(game)) {
          games[game].author = data.nick;
        }
      }
    }
    data.games = games;

    await updateDoc(userRef, data);
    return userData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  setUser,
  getGames
};
