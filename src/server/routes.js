const express = require('express');
const admin = require('./firebase-admin');

const router = express.Router();
const baseURL = '/api';

const authMiddleware = require('./middleware/auth');

router.get(`${baseURL}`, authMiddleware, (req, res) => {
  res.json({ api: 'v1' });
});

router.use(require('./routes/user'));

module.exports = router;
