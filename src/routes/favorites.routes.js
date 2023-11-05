const { Router } = require("express");
const favoritesRoutes = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const FavoritesController = require("../controllers/favoritesController");

const favoritesController = new FavoritesController();

favoritesRoutes.get("/", ensureAuthenticated, favoritesController.index);
favoritesRoutes.patch(
  "/favorites/:id",
  ensureAuthenticated,
  favoritesController.update
);

module.exports = favoritesRoutes;
