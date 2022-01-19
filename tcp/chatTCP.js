exports.createSocket = (io) => {
    let allUsers = []

    const listenToNickname = (socket) => {
        socket.on('set_nickname', (data) => {
            let parsedData = JSON.parse(data)
            socket.nickname = parsedData.nickname


            socket.emit('message', JSON.stringify({
                type: 'serverMessage',
                message: `Bienvenido al chat ${socket.nickname}`,
                nickname: 'chat'
            }))
        })
    }

    const listenToMessage = (socket) => {
        socket.on('message', (message) => {
            message = JSON.parse(message)
            if(message.type == 'userMessage'){
                console.log(socket.nickname)
                message.nickname = socket.nickname
                socket.broadcast.emit('message', JSON.stringify(message));
                message.type = 'myMessage';
                socket.emit('message', JSON.stringify(message))
            }
        })
    }

    const listenToDisconnect = (socket) => {
        socket.on('disconnect', (message) => {
            
            console.log(socket.nickname + ' disconnected')
        })
    }

    
    //cuando se conecte, realizamos las siguientes funciones
    io.sockets.on('connection', (socket) => {

        listenToNickname(socket)//handler evento set_nickname

        listenToMessage(socket)//handler evento mensaje

        listenToDisconnect(socket)//handler evento desconexion

    });
}