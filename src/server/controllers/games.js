const gamesService = require('../services/games.service');

const createGame = function (req, res) {
  const userId = req.authId;
  gamesService.createGame(userId)
    .then((game) => {
      res.json(game);
    });
};

const cloneGame = function (req, res) {
  const gameId = req.params.id;
  const userId = req.authId;
  gamesService.cloneGame(userId, gameId)
    .then((game) => {
      res.json(game);
    });
};

const deleteGame = function (req, res) {
  const gameId = req.params.id;
  const userId = req.authId;
  gamesService.deleteGame(userId, gameId)
    .then(() => {
      res.sendStatus(200);
    });
};

const saveGame = function (req, res) {
  const gameId = req.params.id;
  const userId = req.authId;
  const data = req.body;
  gamesService.saveGame(userId, gameId, data)
    .then((user) => {
      res.json(user);
    });
};

const addComment = function (req, res) {
  const gameId = req.params.id;
  const userId = req.authId;
  const data = req.body;
  gamesService.addComment(userId, gameId, data)
    .then((comment) => {
      res.json(comment);
    });
};

const vote = function (req, res) {
  const gameId = req.params.id;
  const commentId = req.params.comment_id;
  const userId = req.authId;
  const type = req.body.type;
  gamesService.vote(userId, gameId, commentId, type)
    .then (vote => {
      res.json(vote);
    });
}

module.exports = {
  createGame,
  cloneGame,
  deleteGame,
  saveGame,
  addComment,
  vote
};
