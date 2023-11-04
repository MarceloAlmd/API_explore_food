const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { detailing } = request.body;
    const { id } = request.params;

    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    await knex("order").insert({
      code: `0000 ${randomNumber}`,
      detailing,
      user_id: id,
    });

    return response.json({
      message: "Order placed",
      details: detailing,
    });
  }
}

module.exports = OrdersController;
