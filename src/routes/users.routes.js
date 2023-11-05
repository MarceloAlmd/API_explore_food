const { Router } = require("express");
const UsersControllers = require("../controllers/usersControllers");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const usersRoutes = Router();
const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["master", "admin", "customer"]),
  usersControllers.update
);
usersRoutes.delete("/", ensureAuthenticated, usersControllers.delete);

module.exports = usersRoutes;
