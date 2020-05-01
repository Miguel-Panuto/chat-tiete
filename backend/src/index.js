
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const routes = require('./routes');

const MessageController = require('./controllers/MessageController'); 

const PORT = process.env.PORT || 3333;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('Socket conectado id: ', socket.handshake.query.id);
    socket.on('sendMessage', data => {
        MessageController.create(data);
    })
})

app.use(cors());
app.use(express.json()); 
app.use(routes);

server.listen(PORT, () => {
    console.log('Server started on PORT: ' + PORT)
});