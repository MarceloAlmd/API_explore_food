const knex = require("../database/knex");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");
const uploadConfig = require("../configs/uploads");

class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const { user_id } = request.params;

    const dishImg = request.file.filename;

    const diskStorage = new DiskStorage();

    await diskStorage.save(dishImg, uploadConfig.DISHES);

    const newIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

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
      image: dishImg,
    });

    const createIngredients = newIngredients.map((ingredient) => {
      return {
        name: ingredient,
        dishes_id,
        user_id,
      };
    });

    await knex("ingredients").insert(createIngredients);

    return response.status(201).json({
      status: "success",
      message: "success when creating a dish",
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Dish not found");
    }

    const diskStorage = new DiskStorage();

    if (dish.image) {
      await diskStorage.delete(dish.image, uploadConfig.DISHES);
    }

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
    const updateDishImg = request.file.filename;

    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("this dish does not exist");
    }
    const diskStorage = new DiskStorage();

    if (dish.image) {
      await diskStorage.delete(dish.image, uploadConfig.DISHES);
    }

    await diskStorage.save(updateDishImg, uploadConfig.DISHES);

    const transformIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

    const dishedUpdatedExists = await knex("dishes").where({ name }).first();

    if (dishedUpdatedExists && dishedUpdatedExists.id !== dish.id) {
      throw new AppError("This dish is already registered");
    }

    dish.image = updateDishImg ?? dish.image;
    dish.name = name ?? dish.name;
    dish.category = category ?? dish.category;
    dish.price = Number(price) ?? dish.price;
    dish.description = description ?? dish.description;

    await knex("dishes").where({ id }).update({
      name,
      category,
      price,
      description,
      image: updateDishImg,
      updated_at: knex.fn.now(),
    });

    const ingredientsUpdated = transformIngredients.map((ingredient) => {
      return {
        dishes_id: id,
        name: ingredient,
        user_id: dish.user_id,
      };
    });

    await knex("ingredients").where({ dishes_id: id }).delete();

    await knex("ingredients")
      .where({ dishes_id: id })
      .insert(ingredientsUpdated);

    return response.json(dish);
  }
}

module.exports = DishesController;
