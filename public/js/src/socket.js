const io = require('socket.io-client')
const $ = require('jquery');
const socket = io.connect('/')
const chat = require('./chat')


//iniciamos el chat
chat.chatStart(io, socket, $)


