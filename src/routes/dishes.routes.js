const { Router } = require("express");
const uploadsConfig = require("../configs/uploads");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const multer = require("multer");
const DishesControllers = require("../controllers/dishesControllers");
const dishesRoutes = Router();
const dishesControllers = new DishesControllers();

const uploads = multer(uploadsConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  uploads.single("image_dish"),
  dishesControllers.create
);

dishesRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishesControllers.delete
);

dishesRoutes.get(
  "/:id",
  verifyUserAuthorization(["admin", "customer"]),
  dishesControllers.show
);

dishesRoutes.get(
  "/",
  verifyUserAuthorization(["admin", "customer"]),
  dishesControllers.index
);

dishesRoutes.put(
  "/:id",
  verifyUserAuthorization(["admin"]),
  uploads.single("image_dish"),
  dishesControllers.update
);

module.exports = dishesRoutes;
