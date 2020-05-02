
exports.up = function (knex) {
    // When use the command 'knex migrate:latest' will execute this function
    // This function will create the table user
    return knex.schema.createTable('messages', table => {
        table.integer('user_id').unsigned().notNullable();
        table.string('message').notNullable();
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function (knex) {
    // When use the command 'knex migrate:rollback' will execute this function
    // This will drop the table
    return knex.schema.dropTable('messages');
};
