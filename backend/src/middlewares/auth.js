const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const connection = require('../database/connection');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) 
        return res.status(401).json({ error: 'Not allowed, token expected' });

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).json({ error: 'False token' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token not in correct format' });
    }

    jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if(err) return res.status(401).json({ error: 'Invalid token' });
        if(!decoded.id || !decoded.email) 
            return res.status(401).json({ error: 'Invalid token' });
        const findValidUser = await connection('users').select('id', 'email').where({
            id: decoded.id,
            email: decoded.email
        });
        if(findValidUser.length <= 0)
            return res.status(401).json({ error: 'User not exist' });

        req.userId = decoded.id;
        return next();
    })
}