const express = require('express');

const router = express.Router();
const gamesController = require('../controllers/games');
const authMiddleware = require('../middleware/auth');

router.post('/api/games/', authMiddleware, gamesController.createGame);
router.post('/api/games/:id/clone', authMiddleware, gamesController.cloneGame);
router.put('/api/games/:id/', authMiddleware, gamesController.saveGame);
router.delete('/api/games/:id', authMiddleware, gamesController.deleteGame);

module.exports = router;
