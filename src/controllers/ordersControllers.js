const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { detailing } = request.body;
    const user_id = request.user.id;

    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    await knex("order").insert({
      code: `0000 ${randomNumber}`,
      detailing,
      user_id,
    });

    return response.json({
      message: "Order placed",
      details: detailing,
    });
  }

  async update(request, response) {
    const { status } = request.body;
    const { id } = request.params;

    const order = await knex("order").where({ id });

    order.status = status ?? order.status;

    await knex("order").where({ id }).update({
      status,
      updated_at: knex.fn.now(),
    });

    return response.json({
      message: "Status updated",
    });
  }

  async index(request, response) {
    let requests;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (user.role === "admin") {
      requests = await knex("order").orderBy("created_at", "desc");
    } else {
      requests = await knex("order")
        .where({ user_id })
        .orderBy("created_at", "desc");
    }

    return response.json(requests);
  }

  async show(request, response) {
    const { id } = request.params;
    const requestDetails = await knex("order").where({ id });

    return response.json(requestDetails);
  }
}

module.exports = OrdersController;
