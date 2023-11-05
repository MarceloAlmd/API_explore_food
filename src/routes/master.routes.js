const { Router } = require("express");
const MasterControllers = require("../controllers/masterControllers");
const masterRoutes = Router();
const masterControllers = new MasterControllers();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

masterRoutes.use(ensureAuthenticated);
masterRoutes.use(verifyUserAuthorization(["master"]));

masterRoutes.get("/", masterControllers.index);
masterRoutes.post("/", masterControllers.create);
masterRoutes.delete("/:id", masterControllers.delete);
masterRoutes.patch("/:id", masterControllers.update);

module.exports = masterRoutes;
