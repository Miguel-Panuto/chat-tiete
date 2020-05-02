const bcrypt = require('bcrypt'); 
const connection = require('../database/connection');
const generateToken = require('../utils/generateToken');
const CITIES = require('../utils/cities');

// Method to generate a random color to a user
const generateRandomColor = () => "#"+((1<<24)*Math.random()|0).toString(16)

module.exports = {
    // Create a new user
    async create(req, res) {
        // Picks all information that user writed
        const { email, name, city, password } = req.body;
        // Find if there is a user with that email
        const findUser = await connection('users').select('email').where('email', email);
        // If there is one user
        if(findUser.length > 0) // Returns a error
            return res.status(409).json({ error: 'Email already in use' });
        // If there is none city
        if(!(CITIES.find(ct => ct === city)))
            return res.status(409).json({ error: 'Invalid city' }); // Returns a error 
        try {
            // This will create a password with hash cryptography
            const hashPassword = await bcrypt.hash(password, 10);
            // And insert the user to the database
            const user = await connection('users').insert({
                email,
                name,
                city,
                password: hashPassword,
                color: generateRandomColor()
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