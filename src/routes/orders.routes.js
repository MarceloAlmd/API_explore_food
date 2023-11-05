const { Router } = require("express");
const OrdersController = require("../controllers/ordersControllers");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["customer"]),
  ordersController.create
);
ordersRoutes.patch(
  "/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["admin"]),
  ordersController.update
);

module.exports = ordersRoutes;
