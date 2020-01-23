const express = require('express');
const router = express.Router();

const {
  signup,
  getMessages
} = require('../controllers');

router.post('/signup', signup);
router.get('/messages', getMessages);

module.exports = router;
