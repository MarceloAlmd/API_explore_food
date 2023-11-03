const knex = require("../database/knex");
const AppError = require("../utils/appError");

class FavoritesController {
  async update(request, response) {
    const { isFavorite } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Dish not found");
    }

    dish.isFavorite = isFavorite;

    await knex("dishes").where({ id }).update(dish);

    return response.json(dish);
  }

  async index(request, response) {
    const dishes = await knex("dishes");

    const dishesFavorites = dishes.filter((dish) => dish.isFavorite === 1);

    return response.json(dishesFavorites);
  }
}

module.exports = FavoritesController;
