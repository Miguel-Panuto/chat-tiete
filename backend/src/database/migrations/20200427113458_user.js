exports.up = function(knex) {
  // When use the command 'knex migrate:latest' will execute this function
  // This function will create the table user
  return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('city').notNullable();
      table.string('password').notNullable();
      table.string('color').default('#CCCCCC');
  });
};

exports.down = function(knex) {
  // When use the command 'knex migrate:rollback' will execute this function
  // This will drop the table
  return knex.schema.dropTable('users');
};
