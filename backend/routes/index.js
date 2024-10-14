const express = require('express');
const router = express.Router();
const users = require('./users');
const accounts = require('./accounts');
router.use('/users', users);
router.use('/accounts', accounts);
 module.exports = router;
