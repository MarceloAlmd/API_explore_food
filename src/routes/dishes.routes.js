const { Router } = require("express");
const DishesControllers = require("../controllers/dishes/dishesControllers");
const DishesFavoritesController = require("../controllers/dishes/dishesFavoritesController");
const dishesRoutes = Router();
const dishesControllers = new DishesControllers();
const dishesFavoritesController = new DishesFavoritesController();

dishesRoutes.post("/:user_id", dishesControllers.create);
dishesRoutes.delete("/:id", dishesControllers.delete);
dishesRoutes.get("/:id", dishesControllers.show);
dishesRoutes.get("/", dishesControllers.index);
dishesRoutes.put("/:id", dishesControllers.update);

dishesRoutes.get("/favorites/:user_id", dishesFavoritesController.favorites);
dishesRoutes.patch("/favorites/:id", dishesFavoritesController.updateFavorites);

module.exports = dishesRoutes;
