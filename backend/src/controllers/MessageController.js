const connection = require('../database/connection');

module.exports ={
    async index() {
        // Import all the messages and the users from the database
        const messages = await connection('messages')
            .select('users.name', 'messages.message', 'users.color')
            .leftJoin('users', 'messages.user_id', 'users.id');
        // And return to the front
        return messages.map(({ name, message, color }) => {
            return {
                author: name,
                message,
                color
            }
        })
    },  
    // Create the message on the database
    async create({ id, message }) {
        await connection('messages').insert({
            user_id: id,
            message
        })

        const author = await connection('users').select('name').where('id', id);
        return author[0];
    }
}