const { Router } = require("express");
const OrdersController = require("../controllers/ordersControllers");

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post("/:id", ordersController.create);

module.exports = ordersRoutes;
