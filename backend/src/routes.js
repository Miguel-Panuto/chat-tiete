const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/users', UserController.create); 
routes.get('/users', authMiddleware,UserController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;