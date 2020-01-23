const express = require('express');
const router = express.Router();

const {
  getMessages
} = require('../controllers');

router.get('/messages', getMessages);

module.exports = router;
