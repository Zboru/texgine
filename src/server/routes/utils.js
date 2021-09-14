const express = require('express');

const router = express.Router();
const app = require('../firebase');

router.get('/api/checkNickname', async (req, res) => {
  const users = await app.firestore()
    .collection('users')
    .where('nick', '==', req.query.nick)
    .get()
    .then((snap) => snap.size);
  res.json({ invalid: !!users });
});

module.exports = router;
