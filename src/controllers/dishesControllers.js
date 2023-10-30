const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, category, price, description } = request.body;
    const { user_id } = request.params;

    const checkDishesExists = await knex("dishes").where({ name }).first();

    if (checkDishesExists) {
      throw new AppError("This dish is already registered");
    }

    const [dished_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      user_id,
    });

    return response.json("Prato criado com sucesso");
  }

  async createDishesImag(request, response) {}
}

module.exports = DishesController;
