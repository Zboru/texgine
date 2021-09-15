const express = require('express');

const router = express.Router();

router.use(require('./routes/utils'));
router.use(require('./routes/games'));
router.use(require('./routes/user'));

module.exports = router;
