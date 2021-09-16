const app = require('../firebase');

function generateGameId() {
  return Math.random().toString(36).replace(/[^a-z0-9]+/g, '');
}

const createGame = async function (userId) {
  try {
    const userRef = await app.firestore().collection('users').doc(userId);
    const userData = (await userRef.get()).data();

    const gameId = generateGameId();

    const game = {
      id: gameId,
      author: userData.nick,
      description: null,
      title: 'Untitled',
      play_count: 0,
      favorite_count: 0,
      rating: 0,
      comments: [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    userData.games[gameId] = game;
    await userRef.set(userData);

    return game;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const cloneGame = async function (userId, gameId) {
  try {
    const userRef = await app.firestore().collection('users').doc(userId);
    const userData = (await userRef.get()).data();
    const game = userData.games[gameId];

    // Generate new game id
    const newGameId = generateGameId();

    // Create new game object and override author and its id
    const newGame = {
      ...game,
      author: userData.nick,
      id: newGameId,
    };

    // Add game to user games collection
    userData.games[newGameId] = newGame;
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

const saveGame = async function (userId, gameId) {
  return '123';
};

module.exports = {
  createGame, cloneGame, deleteGame, saveGame,
};
