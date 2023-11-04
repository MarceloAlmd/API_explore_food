exports.up = (knex) =>
  knex.schema.createTable("order", (table) => {
    table.increments("id");
    table
      .enum("status", ["pending", "preparing", "delivered"], {
        useNative: true,
        enumName: "status",
      })
      .notNullable()
      .default("pending");

    table.integer("code").notNullable();
    table.text("detailing").notNullable();

    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("order");
