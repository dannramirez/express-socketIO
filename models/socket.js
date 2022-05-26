class Sockets {
    constructor(io) {
        this.io=io;
    }

    socketEvents(){
        this.io.on('connection', (socket) => {

            console.log(`Cliente conectado ${socket.id}`);
            socket.emit("welcome-message", {
                date: new Date(),
                msg: "Conectado al servidor"
            });
        
            socket.on('message-to-server', (data) => {
                console.log(data);
                this.io.emit("message-from-server",data);
        
            });
        
        
        });
    }
}

module.exports = Sockets;