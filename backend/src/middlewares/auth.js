const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const connection = require('../database/connection');

module.exports = (req, res, next) => {
    // This will pickup the content from the authorization
    const authHeader = req.headers.authorization;

    // Verify if there is not a header, and this will send a error
    if(!authHeader) 
        return res.status(401).json({ error: 'Not allowed, token expected' });

    // split in 2 the 'Bearer anthejwtcode'
    const parts = authHeader.split(' ');

    // Verify if is in 2 parts, if ins't will return a error
    if(!parts.length === 2)
        return res.status(401).json({ error: 'False token' });

    const [ scheme, token ] = parts;

    // Verify if isn't  bearer and return a error
    if('bearer' !== scheme.toLowerCase()) {
        return res.status(401).json({ error: 'Token not in correct format' });
    }

    // And then verify if thw jwt is correct
    jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if(err) return res.status(401).json({ error: 'Invalid token' });
        // Verify if putted any stuff incorrect
        if(!decoded.id || !decoded.email) 
            return res.status(401).json({ error: 'Invalid token' });
        
        // And find in the database the user id and email
        const findValidUser = await connection('users').select('id', 'email').where({
            id: decoded.id,
            email: decoded.email
        });

        // if there isn't any user will return a error
        if(findValidUser.length <= 0)
            return res.status(401).json({ error: 'User not exist' });

        req.userId = decoded.id;
        req.userName = decoded.name;
        req.color = decoded.color;
        return next();
    });
}

