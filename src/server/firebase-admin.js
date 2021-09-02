const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = admin;
