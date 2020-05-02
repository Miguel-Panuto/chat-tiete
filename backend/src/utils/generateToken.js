const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


// This will generate a new token to maintain the session in 1 day
const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = generateToken;