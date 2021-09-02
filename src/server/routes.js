const express = require('express');
const admin = require('./firebase-admin');

const router = express.Router();
const baseURL = '/api';

router.get(`${baseURL}`, (req, res) => {
  res.json({ api: 'v1' });
});

router.get(`${baseURL}/userData`, (req, res) => {
  res.send(req.authId);
});

router.get(`${baseURL}/authenticate`, async (req, res) => {
  try {
    const firebaseToken = await admin.auth().createCustomToken(req.query.uid);
    res.json({ firebaseToken });
  } catch (err) {
    res.status(500).send({
      message: 'Something went wrong acquiring a Firebase token.',
      error: err,
    });
  }
});

module.exports = router;
