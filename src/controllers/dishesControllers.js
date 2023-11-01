const knex = require("../database/knex");
const AppError = require("../utils/appError");

class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const { user_id } = request.params;

    console.log(ingredients);

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

    console.log(createIngredients);

    await knex("ingredients").insert(createIngredients);

    return response.json("Prato criado com sucesso");
  }
}

module.exports = DishesController;
