const { Router } = require("express");
const DishesControllers = require("../controllers/dishesControllers");
const dishesRoutes = Router();
const dishesControllers = new DishesControllers();

dishesRoutes.post("/:user_id", dishesControllers.create);
dishesRoutes.delete("/:id", dishesControllers.delete);

module.exports = dishesRoutes;
