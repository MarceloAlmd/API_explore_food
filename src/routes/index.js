const { Router } = require("express");
const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const favoritesRoutes = require("./favorites.routes");
const ingredientsRoutes = require("./ingredients.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favorites", favoritesRoutes);

routes.use("/ingredients", ingredientsRoutes);

module.exports = routes;
