const {
	db
} = require('../firebase');
const {
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	getDocs,
	collection
} = require('firebase/firestore');

function generateId() {
	return Math.random()
		.toString(36)
		.replace(/[^a-z0-9]+/g, '');
}

const getGames = async function () {
	const games = [];
	const querySnapshot = await getDocs(collection(db, "games"));
	querySnapshot.forEach((doc) => {
		const game = doc.data();
		if (game.public === true) {
			games.push(game);
		}
	});
	return games;
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
			author_uid: userData.uid,
			description: null,
			steps: {},
			canvas: {},
			title: 'Untitled',
			play_count: 0,
			favorite_count: 0,
			rating: 0,
			comments: {},
			public: false,
			created_at: new Date(),
			updated_at: new Date(),
		};
		// Save game to games collection
		const gameRef = await doc(db, 'games', gameId);
		await setDoc(gameRef, game);

		// Add game data to user's games collection
		userData.games.push(gameRef);
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

		const gameDoc = await getDoc(doc(db, 'games', gameId));
		const game = gameDoc.data();

		// Generate new game id
		const newGameId = generateId();

		// Create new game object and override author and its id
		const newGame = {
			...game,
			author: userData.nick,
			author_uid: userData.uid,
			comments: {},
			play_count: 0,
			favorite_count: 0,
			rating: 0,
			public: false,
			title: `${game.title} - Clone`,
			id: newGameId,
		};
		// Save game to games collection
		const gameRef = await doc(db, 'games', newGameId);
		await setDoc(gameRef, newGame);

		// Add game to user games collection
		userData.games.push(gameRef);
		await setDoc(userRef, userData);

		return newGame;
	} catch (err) {
		console.error(err);
		return err;
	}
};

const deleteGame = async function (userId, gameId) {
	try {
		// Delete game reference from array
		const userRef = await doc(db, 'users', userId);
		const userSnap = await getDoc(userRef);
		const userData = userSnap.data();

		const games = userData.games;
		const gameIndex = games.findIndex(game => game.id === gameId);
		games.splice(gameIndex, 1);
		await setDoc(userRef, userData);

		// Remove game from games collection
		await deleteDoc(doc(db, 'games', gameId));

		return userData;
	} catch (err) {
		console.error(err);
		return err;
	}
};

const saveGame = async function (userId, gameId, data) {
	try {
		const gameRef = await doc(db, 'games', gameId);
		await setDoc(gameRef, data);
		return data;
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
		if (typeof gameData.comments === 'undefined') {
			gameData.comments = {};
		}

		const commentId = generateId();
		const comment = {
			id: commentId,
			author: userData.nick,
			author_uid: userData.uid,
			authorAvatar: userData.avatar.url,
			text: data.comment,
			created_at: new Date(),
			votes: {}
		};

		gameData.comments[commentId] = comment;
		await setDoc(gameRef, gameData);

		return comment;
	} catch (err) {
		console.error(err);
		return err;
	}
};

const vote = async function (userId, gameId, commentId, type) {
	try {
		const gameRef = await doc(db, 'games', gameId);
		const gameSnap = await getDoc(gameRef);
		const gameData = gameSnap.data();

		const comment = gameData.comments[commentId];

		// If vote already exists, delete it
		if (comment.votes[userId] && comment.votes[userId] === parseInt(type)) {
			delete comment.votes[userId];
		} else {
			comment.votes[userId] = parseInt(type);
		}

		await setDoc(gameRef, gameData);
		return comment;
	} catch (err) {
		console.error(err);
		return err;
	}
};

module.exports = {
	getGames,
	createGame,
	cloneGame,
	deleteGame,
	saveGame,
	addComment,
	vote
};
