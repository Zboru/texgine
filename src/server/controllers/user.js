const userService = require('../services/user.service');

const getUser = function (req, res) {
  res.json({ message: 'POST new tea' }); // dummy function for now
};

const getGames = function (req, res) {
  userService.getGames(req.params.id).then((response) => {
    res.json({ games: response.games });
  });
};

const setUser = function (req, res) {
  userService.setUser(req.params.uid, req.body).then((rest) => {
    res.json(rest);
  });
};

module.exports = { getUser, getGames, setUser };
