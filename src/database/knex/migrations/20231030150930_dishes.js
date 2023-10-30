exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");

    table.text("name").notNullable();
    table.text("category").notNullable();
    table.text("image");

    table.integer("price").notNullable();
    table.integer("user_id").references("id").inTable("users");

    table.boolean("isFavorite").default(false);

    table.text("description");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
