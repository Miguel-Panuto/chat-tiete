
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const routes = require('./routes');

const MessageController = require('./controllers/MessageController'); 
const CitiesController = require('./controllers/CitiesController'); 

const PORT = process.env.PORT || 3333;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('Socket conectado id: ', socket.handshake.query.id);
    MessageController.index().then(res => {
        socket.emit('previousMessages', res);
    });
    CitiesController.index().then(res => {
        socket.emit('users', res);
        socket.broadcast.emit('users', res);
    });
    socket.on('sendMessage', messageData => {
        MessageController.create(messageData);
        socket.broadcast.emit('receiveMessage', {
            author: messageData.author,
            message: messageData.message
        });
    });
});



app.use(cors());
app.use(express.json()); 
app.use(routes);

server.listen(PORT, () => {
    console.log('Server started on PORT: ' + PORT)
});