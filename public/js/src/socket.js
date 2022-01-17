const io = require('socket.io-client')
const $ = require('jquery');
let socket = io.connect('/');

//cuando nos llegue un mensaje, lo introducimos en nuestro documento
socket.on('message', (data) => {
    data = JSON.parse(data)
    $('#messages').append(`<div class="${data.type}">${data.message}</div>`)
})

//esta funcion, toma el mensaje en #message y lo envia al servidor

const sendMessage = () => {
    let data = {
        message: $('#message').val(),
        type: 'userMessage'
    }

    socket.emit('message', JSON.stringify(data))

    $('#message').val('')
}
$(() => {
    $('#send').click(() => {
        sendMessage()
    })

    $('#message').on('keypress',(e) => {
        if(e.which == 13) {
            sendMessage()
        }
    });
})

