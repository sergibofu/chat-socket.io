class ChatFrontend {
    constructor(io, namespace){
        this.io = io
        this.namespace = namespace
        this.listOfCallbacks = []
        this.socket = io.connect(this.namespace)
    }

    connect() {
            this.listOfCallbacks.forEach((callback) => {
                callback(this.socket)
            })
      
    }

    registerCallback(callback){
        this.listOfCallbacks.push(callback)
    }

    emit(event, data){
        this.socket.emit(event, data)
    }

}

module.exports = ChatFrontend;