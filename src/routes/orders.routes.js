const { Router } = require("express");
const OrdersController = require("../controllers/ordersControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post("/", ensureAuthenticated, ordersController.create);
ordersRoutes.patch("/:id", ordersController.update);

module.exports = ordersRoutes;
