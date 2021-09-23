const {
  app,
  db
} = require('../firebase');
const {
  doc,
  getDoc,
  setDoc
} = require('firebase/firestore');

function generateId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z0-9]+/g, '');
}

const createGame = async function (userId) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const gameId = generateId();
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
      comments: {},
      created_at: new Date(),
      updated_at: new Date(),
    };
    // Save game to collection
    const gameRef = await doc(db, 'games', gameId);
    await setDoc(gameRef, game);

    // Add game data to user's games collection
    userData.games[gameId] = gameRef;
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
    const newGameId = generateId();

    // Create new game object and override author and its id
    const newGame = {
      ...game,
      author: userData.nick,
      comments: {},
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
    const gameRef = await doc(db, 'games', gameId);
    const gameSnap = await getDoc(gameRef);
    const gameData = gameSnap.data();

    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // Create comment object in case it does not exist
    if (typeof gameData.comments === "undefined") {
      gameData.comments = {};
    }

    const commentId = generateId();
    const comment = {
      id: commentId,
      author: userData.nick,
      authorAvatar: userData.avatar.url,
      text: data.comment,
      created_at: new Date(),
      votes: {}
    };
    console.log(gameData,comment);
    gameData.comments[commentId] = comment;
    await setDoc(gameRef, gameData);

    userData.games[gameId] = gameData;
    await setDoc(userRef, userData);

    return comment;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const vote = async function (userId, gameId, commentId, type) {
  try {
    const userRef = await doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const game = userData.games[gameId];
    const comment = game.comments[commentId];

    comment.votes[userId] = type === "upvote" ? 1 : -1

    await setDoc(userRef, userData);
    return comment;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  createGame,
  cloneGame,
  deleteGame,
  saveGame,
  addComment,
  vote
};
