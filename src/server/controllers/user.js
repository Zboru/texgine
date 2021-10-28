const userService = require('../services/user.service');

const getUser = function (req, res) {
  res.json({ message: 'POST new tea' }); // dummy function for now
};

const getGames = function (req, res) {
  userService.getGames(req.params.id).then((response) => {
    res.json({ games: response });
  });
};

const setUser = function (req, res) {
  userService.setUser(req.params.uid, req.body).then(() => {
    res.json({ message: 'Successfuly saved user profile settings' });
  });
};

module.exports = { getUser, getGames, setUser };
