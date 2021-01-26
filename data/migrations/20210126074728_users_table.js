
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("department").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropIfTableExists("users");
};
