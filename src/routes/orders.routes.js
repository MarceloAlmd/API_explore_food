const { Router } = require("express");
const OrdersController = require("../controllers/ordersControllers");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post(
  "/",
  verifyUserAuthorization(["customer"]),
  ordersController.create
);

ordersRoutes.patch(
  "/:id",
  verifyUserAuthorization(["admin"]),
  ordersController.update
);

ordersRoutes.get(
  "/",
  verifyUserAuthorization(["admin", "customer"]),
  ordersController.index
);
ordersRoutes.get(
  "/:id",
  verifyUserAuthorization(["customer"]),
  ordersController.show
);

module.exports = ordersRoutes;
