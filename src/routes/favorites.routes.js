const { Router } = require("express");
const favoritesRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const FavoritesController = require("../controllers/favoritesController");

const favoritesController = new FavoritesController();

favoritesRoutes.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["customer"]),
  favoritesController.index
);

favoritesRoutes.patch(
  "/favorites/:id",
  ensureAuthenticated,
  verifyUserAuthorization(["customer"]),
  favoritesController.update
);

module.exports = favoritesRoutes;
