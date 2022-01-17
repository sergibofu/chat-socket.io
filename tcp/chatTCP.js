exports.createSocket = (io) => {
    //cuando se conecte, realizamos las siguientes funciones
    io.sockets.on('connection', (socket) => {
        socket.emit('message', JSON.stringify({
            type: 'serverMessage',
            message: 'Welcome to the most awesome chat'
        }))

        socket.on('message', (message) => {
            message = JSON.parse(message)
            if(message.type == 'userMessage'){
                console.log(message)
                socket.broadcast.emit('message', JSON.stringify(message));
                message.type = 'myMessage';
                socket.emit('message', JSON.stringify(message))
            }
        })
    });
}