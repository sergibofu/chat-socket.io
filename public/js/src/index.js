const io = require('socket.io-client')
const $ = require('jquery');
// const socket = io.connect('/')
const Chat = require('./ChatFrontend')


//iniciamos el chat v1.0
//chat.chatStart(io, socket, $)

//iniciamos el chat v2.0
let chatInfra = new Chat(io, '/chat_infra')
let chatCom = new Chat(io, '/chat_com')

$('#setname').click(() => { //
    chatInfra.emit('set_name', {
        nickname: $('#nickname').val()
    })

})

chatInfra.registerCallback((socket) => {
    socket.on('name_set', (data) => {
        $('#nameform').hide();
        $('#chatroom').show();

        socket.on('user_entered', (user) => {
            $('#messages').append('<div class="systemMessage">' + user.nickname
                + ' has joined the room.' + '</div>');
        })
    })
})

chatInfra.registerCallback((socket) => {
    socket.on('message', (message) => {
        let parsedMessage = JSON.parse(message);
        $('#messages').append('<div class="' + parsedMessage.type + '">'
        + parsedMessage.message + '</div>');
    })
})

chatCom.registerCallback((socket) => {
    socket.on('message', (message) => {
        console.log(message)
        let parsedMessage = JSON.parse(message);
        $('#messages').append('<div class="' +
        parsedMessage.type + '"><span class="name">' +
        parsedMessage.nickname + ':</span> ' +
        parsedMessage.message + '</div>');
    })
})

$('#send').click(() => { //
    console.log('test')
    chatCom.emit('message', {
        message: $('#message').val(),
        type: 'userMessage'
    })

})

chatInfra.connect()
chatCom.connect()
