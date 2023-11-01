const knex = require("../../database/knex");
const AppError = require("../../utils/appError");

class DishesFavoritesController {
  async updateFavorites(request, response) {
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

  async favorites(request, response) {
    const { user_id } = request.params;
    const dishes = await knex("dishes").where({ user_id });

    const dishesFavorites = dishes.filter((dish) => dish.isFavorite === 1);

    return response.json(dishesFavorites);
  }
}

module.exports = DishesFavoritesController;
