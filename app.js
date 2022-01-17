require('dotenv').config()//cargamos nuestras variables de entorno
const express = require('express')
const cors = require('cors')
const http = require('http')
const app = express()//creamos nuestra app
const httpServer = http.createServer(app)//creamos nuestro server http
const io = require('socket.io')(httpServer)//iniciamos nuestra clase socketio
const routes = require('./routes/routes')
const chatTCP = require('./tcp/chatTCP')

//inicializamos nuestro server HTTP
httpServer.listen(process.env.PORT, () => {
    console.log('app running on port: ' + process.env.PORT)

    
    //seteamos nuestras variables
    app.set('view engine', 'pug')
    app.set('views', __dirname + '/public/views')

    //cargamos nuestros middleware
    app.use(express.static(__dirname+'/public'));
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use('/', routes)
});

//inicializamos nuestro server TCP
chatTCP.createSocket(io);