const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.get('/api/user', authMiddleware, userController.getUser);
router.get('/api/user/:id/games', authMiddleware, userController.getGames);
router.post('/api/user/:uid', authMiddleware, userController.setUser);

module.exports = router;
