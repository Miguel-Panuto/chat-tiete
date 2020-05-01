
exports.up = function(knex) {
    return knex.schema.createTable('messages', table => {
        table.integer('user_id').unsigned().notNullable();
        table.string('message').notNullable();
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};
