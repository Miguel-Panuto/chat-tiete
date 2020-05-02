const knex = require('knex');
const configuration = require('../../knexfile');

// Configuration to connection to the database
const connection = knex(configuration.development);

module.exports = connection;