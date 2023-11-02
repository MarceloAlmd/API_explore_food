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

  async index(request, response) {
    const { user_id, name } = request.query;

    const dishes = await knex("dishes")
      .where({ user_id })
      .whereLike("name", `%${name}%`);

    return response.json(dishes);
  }

  async update(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const { id } = request.params;

    const dishUpdated = await knex("dishes").where({ id }).first();

    if (!dishUpdated) {
      throw new AppError("this dish does not exist");
    }

    const dishedUpdatedExists = await knex("dishes").where({ name }).first();

    if (dishedUpdatedExists && dishedUpdatedExists.id !== dishUpdated.id) {
      throw new AppError("This dish is already registered");
    }

    await knex("dishes").where({ id }).update({
      name,
      category,
      price,
      description,
    });

    const ingredientsUpdated = ingredients.map((ingredient) => {
      return {
        dishes_id: id,
        name: ingredient,
      };
    });

    await knex("ingredients").where({ dishes_id: id }).delete();

    await knex("ingredients")
      .where({ dishes_id: id })
      .insert(ingredientsUpdated);

    return response.json();
  }
}

module.exports = DishesController;
