const app = require('../firebase');

const cloneGame = async function (userId, gameId) {
  try {
    const userRef = await app.firestore().collection('users').doc(userId);
    const userData = (await userRef.get()).data();
    const game = userData.games[gameId];

    // Generate new game id
    const newGameID = Math.random().toString(36).replace(/[^a-z0-9]+/g, '');

    // Create new game object and override author and its id
    const newGame = {
      ...game,
      author: userData.nick,
      id: newGameID,
    };

    // Add game to user games collection
    userData.games[newGameID] = newGame;
    await userRef.set(userData);

    return newGame;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const deleteGame = async function (userId, gameId) {
  try {
    const userRef = app.firestore().collection('users').doc(userId);
    const userData = (await userRef.get()).data();
    const games = userData.games;
    delete games[gameId];
    await userRef.set(userData);
    return userData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = { cloneGame, deleteGame };
