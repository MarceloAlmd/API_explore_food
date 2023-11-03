const { Router } = require("express");
const favoritesRoutes = Router();

const FavoritesController = require("../controllers/favoritesController");

const favoritesController = new FavoritesController();

favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.patch("/favorites/:id", favoritesController.update);

module.exports = favoritesRoutes;
