const express = require('express');
const router = express.Router();

const { app, db } = require('../firebase');
const {getDocs, collection, query, where} = require('firebase/firestore');

router.get('/api/checkNickname', async (req, res) => {
  const usersRef = collection(db,'users');
  const usersQuery = query(usersRef, where('nick', '==', req.query.nick))
  const userSnap = await getDocs(usersQuery);
  res.json({ invalid: !!userSnap.size });
});

module.exports = router;
