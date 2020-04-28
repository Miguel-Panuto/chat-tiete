const bcrypt = require('bcrypt');
const connection = require('../database/connection');

const generateToken = require('../utils/generateToken');

module.exports = {
    async create(req, res) {
        const { email, password } = req.body;
        const user = await connection('users').where('email', email);
        if (!user[0])
            return res.status(500).json({ error: 'Invalid password or email' });
        if (!await bcrypt.compare(password, user[0].password))
            return res.status(500).json({ error: 'Invalid password or email' });

        user[0].password = undefined;
        
        return res.json({ id: user[0].id, token:generateToken({ id: user[0].id, email }) });
    }
}