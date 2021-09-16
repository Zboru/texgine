const gamesService = require('../services/games.service');

const createGame = function (req, res) {
  const userId = req.authId;
  gamesService.createGame(userId).then((game) => {
    res.json(game);
  });
};

const cloneGame = function (req, res) {
  const gameId = req.params.id;
  const userId = req.authId;
  gamesService.cloneGame(userId, gameId).then((game) => {
    res.json(game);
  });
};

const deleteGame = function (req, res) {
  const gameId = req.params.id;
  const userId = req.authId;
  gamesService.deleteGame(userId, gameId).then((user) => {
    res.json(user);
  });
};

const saveGame = function (req, res) {
  const gameId = req.params.id;
  const userId = req.authId;
  gamesService.saveGame(userId, gameId).then((user) => {
    res.json(user);
  });
};

module.exports = {
  createGame, cloneGame, deleteGame, saveGame,
};
