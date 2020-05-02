const bcrypt = require('bcrypt');
const connection = require('../database/connection');

const generateToken = require('../utils/generateToken');

module.exports = {
    // This will create a session
    async create(req, res) {
        // Picks the email and the password that user entered
        let { email, password } = req.body;
        // Fint a email on the database
        const user = await connection('users').where('email', email);
        if (!user[0]) // If not finded
            return res.status(500).json({ error: 'Invalid password or email' });
            // Return the error
        // And then compare if the password is not valid
        if (!await bcrypt.compare(password, user[0].password))
            return res.status(500).json({ error: 'Invalid password or email' });
            // Return the error

        // For safety the variables that has the password will be empty
        password = undefined; 
        user[0].password = undefined;
        
        // And returns the user id and the one day token
        return res.json({ id: user[0].id, token:generateToken({ 
            id: user[0].id,
            name: user[0].name,
            email 
        }) 
    });
    }
}