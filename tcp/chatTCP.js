const Chat = require('./ChatBackend')
exports.createSocket = (io) => {

    
let chatInfra = new Chat(io, '/chat_infra')
chatInfra.registerCallback((socket) => {
    socket.on('set_name', (data) => {
        socket.nickname = data.nickname
        socket.emit('name_set', data)     
        socket.emit('message', JSON.stringify({
            message: 'Welcome to the most interesting chatroom',
            type: 'serverMessage'
        }))   
        socket.broadcast.emit('user_entered', data)

   })
})
chatInfra.connect()

let chatCom = new Chat(io, '/chat_com')
chatCom.registerCallback((socket) => {
    socket.on('message', (message) => {

       console.log(socket.id)
        if(message.type == 'userMessage'){
            message.nickname = chatInfra.getSocketParam('nickname')
            socket.broadcast.emit('message', JSON.stringify(message))
            message.type = 'myMessage'
            socket.emit('message', JSON.stringify(message))
        }
    })
})

chatCom.connect()



}