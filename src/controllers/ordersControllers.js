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
    const requests = await knex("order");

    return response.json(requests);
  }
}

module.exports = OrdersController;
