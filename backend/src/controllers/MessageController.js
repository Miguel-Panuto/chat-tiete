const connection = require('../database/connection');

module.exports ={
    async create({ id, message }) {
        await connection('messages').insert({
            user_id: id,
            message
        })
    }
}