const getUser = function (req, res, next) {
  res.json({ message: 'POST new tea' }); // dummy function for now
};

const getGames = function (req, res, next) {
  res.json({ message: 'sieemenao' });
};

module.exports = { getUser, getGames };
