const express = require('express')
const router = express.Router()
const chatHTTP = require('../controllers/chatHTTP')
router.route('/chat').get(chatHTTP.getChat)


module.exports = router