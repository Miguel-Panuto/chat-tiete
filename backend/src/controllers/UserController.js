const bcrypt = require('bcrypt'); 
const connection = require('../database/connection');
const generateToken = require('../utils/generateToken');

module.exports = {
    async index(req, res) {
        const users = await connection('users').select('id', 'name', 'city');
        return res.json(users);
    },

    async create(req, res) {
        const { email, name, city, password } = req.body;
        const findUser = await connection('users').select('email').where('email', email);
        if(findUser.length > 0)
            return res.status(409).json({ error: 'Email already in use' });
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await connection('users').insert({
                email,
                name,
                city,
                password: hashPassword
            });
             
            res.json({ 
                id: user[0], 
                token: generateToken({ id: user[0], email, name, city }) 
            });
        } catch(e) {
            res.status(500).send();
        } 

    }
}