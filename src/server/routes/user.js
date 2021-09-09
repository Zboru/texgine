const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/api/user', userController.getUser);
router.get('/api/user/:id/games', userController.getGames);

module.exports = router;
