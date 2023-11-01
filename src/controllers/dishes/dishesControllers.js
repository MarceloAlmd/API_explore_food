const knex = require("../../database/knex");
const AppError = require("../../utils/appError");

class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const { user_id } = request.params;

    const checkDishesExists = await knex("dishes").where({ name }).first();

    if (checkDishesExists) {
      throw new AppError("This dish is already registered");
    }

    const [dishes_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      user_id,
    });

    const createIngredients = ingredients.map((ingredient) => {
      return {
        name: ingredient,
        dishes_id,
        user_id,
      };
    });

    await knex("ingredients").insert(createIngredients);

    return response.json("Prato criado com sucesso");
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.status(200).json({
      status: "Success",
      message: "Dish deleted successfully",
    });
  }

  async show(request, response) {
    const { id } = request.params;
    const dish = await knex("dishes").where({ id }).first();
    const ingredient = await knex("ingredients").where({ dishes_id: id });

    return response.json({
      ...dish,
      ingredient,
    });
  }
}

module.exports = DishesController;
