const express = require('express');

const router = express.Router();

router.use(require('./routes/user'));

module.exports = router;
