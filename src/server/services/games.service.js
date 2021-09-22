const { app, db } = require('../firebase');
const {doc, getDoc, setDoc} = require('firebase/firestore');

function generateGameId() {
  return Math.random().toString(36).replace(/[^a-z0-9]+/g, '');
}

const createGame = async function (userId) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const gameId = generateGameId();

    const game = {
      id: gameId,
      author: userData.nick,
      description: null,
      steps: {},
      canvas: {},
      title: 'Untitled',
      play_count: 0,
      favorite_count: 0,
      rating: 0,
      comments: [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    userData.games[gameId] = game;
    await setDoc(userRef, userData);

    return game;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const cloneGame = async function (userId, gameId) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const game = userData.games[gameId];

    // Generate new game id
    const newGameId = generateGameId();

    // Create new game object and override author and its id
    const newGame = {
      ...game,
      author: userData.nick,
      comments: [],
      play_count: 0,
      favorite_count: 0,
      rating: 0,
      title: `${game.title} - Clone`,
      id: newGameId,
    };

    // Add game to user games collection
    userData.games[newGameId] = newGame;
    await setDoc(userRef, userData);

    return newGame;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const deleteGame = async function (userId, gameId) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const games = userData.games;
    delete games[gameId];
    await setDoc(userRef, userData);
    return userData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const saveGame = async function (userId, gameId, data) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    userData.games[gameId] = data;
    await setDoc(userRef, userData);

    return userData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const addComment = async function (userId, gameId, data) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const game = userData.games[gameId];
    const comment = {
      author: userData.nick,
      authorAvatar: userData.avatar.url,
      text: data.comment,
      created_at: new Date(),
    }
    game.comments.push(comment);

    await setDoc(userRef, userData);
    return comment;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  createGame, cloneGame, deleteGame, saveGame, addComment
};
