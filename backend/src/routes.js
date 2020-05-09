const express = require('express');

// Controllers
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

// Middlewares
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

// Entry point to the chat
routes.get('/chat', authMiddleware, (req, res) => res.json({
    name: req.userName,
    id: req.userId,
    color: req.color
}));

// Create a new user
routes.post('/users', UserController.create);

// Creates a new session
routes.post('/sessions', SessionController.create);

module.exports = routes;