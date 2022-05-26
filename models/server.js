const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const path = require('path');
const Sockets = require('./socket');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);

        //Socket.io
        this.io = socketio(this.server, {
            cors: {
                origin: '*',
            }
        })
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static(path.resolve(__dirname,'../public')));
    }

    socketConfig(){
       new Sockets(this.io).socketEvents();
    }

    execute() {

        this.middlewares();

        this.socketConfig();

        this.server.listen(this.port, () => {
            console.log(`Sevidor ejecutandose en ${this.port}`)
        });
    }
}

module.exports = Server;