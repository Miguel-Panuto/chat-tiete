const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const routes = require('./routes');

// Controller
const MessageController = require('./controllers/MessageController'); // Manage the messages
const CitiesController = require('./controllers/CitiesController'); // Extract the cities

const PORT = process.env.PORT || 3333;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// When user connects on the front, he emmits 'connection', and the backend is listning for
io.on('connection', socket => {
    console.log('User id: ', socket.handshake.query.id, 'socket id : ', socket.id);
    MessageController.index().then(res => {
        // This will send all previous messages for the user, and new users
        socket.emit('previousMessages', res);
    });
    CitiesController.index().then(res => {
        // This will send to the entry users, all user that has a account
        socket.emit('users', res);
        // And this to all users 
        socket.broadcast.emit('users', res);
    });
    // This is for message receivement
    socket.on('sendMessage', messageData => {
        // Creates the message on the database
        MessageController.create(messageData);
        // And emmits too all users, the message and who is from
        socket.broadcast.emit('receiveMessage', {
            author: messageData.author,
            message: messageData.message,
            color: messageData.color,
            user_id: messageData.user_id
        });
    });
});

app.use(cors());
app.use(express.json()); 
app.use(routes);

server.listen(PORT, () => {
    console.log('Server started on PORT: ' + PORT)
});
