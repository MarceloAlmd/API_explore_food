const { Router } = require("express");
const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const favoritesRoutes = require("./favorites.routes");
const ingredientsRoutes = require("./ingredients.routes");
const ordersRoutes = require("./orders.routes");
const masterRoutes = require("./master.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/favorites", favoritesRoutes);

routes.use("/ingredients", ingredientsRoutes);
routes.use("/order", ordersRoutes);

routes.use("/config-users", masterRoutes);

routes.use("/sessions", sessionsRoutes);

module.exports = routes;
