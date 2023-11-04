const knex = require("../database/knex");
const uploadConfig = require("../configs/uploads");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");

class IngredientsController {
  async update(request, response) {
    const { id } = request.params;
    const ingredientImg = request.file.filename;
    const diskStorage = new DiskStorage();

    const ingredient = await knex("ingredients").where({ id }).first();

    if (!ingredient) {
      throw new AppError("This ingredient is not registered");
    }

    if (ingredient.image) {
      await diskStorage.delete(ingredient.image, uploadConfig.INGREDIENTS);
    }

    await diskStorage.save(ingredientImg, uploadConfig.INGREDIENTS);

    ingredient.image = ingredientImg ?? ingredient.image;

    await knex("ingredients").where({ id }).update(ingredient);

    return response.json(ingredient);
  }
}

module.exports = IngredientsController;
