class ChatBackend{
    constructor(io, namespace){
        this.io = io
        this.namespace = namespace
        this.listOfCallbacks = []
        this.socket
        
    }

    connect(){
        this.io.of(this.namespace).on('connection', (socket) => {
            this.socket = socket
            this.listOfCallbacks.forEach((callback) => {
                callback(socket)
            })
        })
    }

    registerCallback(callback){
        this.listOfCallbacks.push(callback)
    }

    getSocketId(){
        return this.socket.id
    }

    getSocketParam(param){
        return this.socket[param]
    }
}

module.exports = ChatBackend;