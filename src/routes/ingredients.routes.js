const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/uploads");
const IngredientsController = require("../controllers/ingredientsControllers");

const ingredientsRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const ingredientsController = new IngredientsController();

ingredientsRoutes.patch(
  "/:id",
  upload.single("image_ingredient"),
  ingredientsController.update
);

module.exports = ingredientsRoutes;
