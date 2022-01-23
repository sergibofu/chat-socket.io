exports.chatStart = (io, socket, $) => {
    console.log('Chat init...')

    login(socket, $)//esta funcion gestiona el envio del login y el cambio de la pantalla de chat a la de login

    listenToMessage(socket, $)//esta funcion inicia los sockets que escucharan a '/'

    onClickOrEnterSendMessage(socket, $)//esta funcion se encarga de enviar el mensaje al clickar o pulsar enter





}


const login = (socket, $) => {
    /*Aqui la parte que se encarga de gestionar el login */

    $('#setname').click(() => {//al clicar enviar nick
        let nickname = $('#nickname').val()
        socket.emit('set_nickname', JSON.stringify({
            nickname: nickname
        }))

        $('#nameform').hide()
        $('#chatroom').show()
    })


    $('#nickname').on('keypress', (e) => {//al ppulsat enter enviar nick
        if (e.which == 13) {

            
            let nickname = $('#nickname').val()
            socket.emit('set_nickname', JSON.stringify({
                nickname: nickname
            }))

            $('#nameform').hide()
            $('#chatroom').show()
        }
    })

}

const listenToMessage = (socket, $) => {
    socket.on('message', (data) => {
        data = JSON.parse(data)
        $('#messages').append(`<div class="${data.type}"><span class="username">${data.nickname}: </span>${data.message}</div>`)
        autoScrollChatDown($)

    })
}

//esta funcion, toma el mensaje en #message y lo envia al servidor


const onClickOrEnterSendMessage = (socket, $) => {
    const sendMessage = () => {
        let data = {
            message: $('#message').val(),
            type: 'userMessage'
        }

        socket.emit('message', JSON.stringify(data))

        $('#message').val('')
    }

    //funciones a lanzar cuando el documento html se haya cargado
    $(() => {
        $('#send').click(() => {
            sendMessage()
        })

        $('#message').on('keypress', (e) => {
            //al pulsar enter
            if (e.which == 13) {
                sendMessage()
            }
        });
    })
}

const autoScrollChatDown = ($) => {
    $('#messages').scrollTop($('#messages').prop('scrollHeight'))
}