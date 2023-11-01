exports.up = (knex) =>
  knex.schema.createTable("ingredients", (table) => {
    table.increments("id");

    table.text("name").notNullable();
    table.text("image");

    table
      .integer("dishes_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("ingredients");
