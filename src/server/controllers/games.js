const gamesService = require('../services/games.service');

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

module.exports = { cloneGame, deleteGame };
