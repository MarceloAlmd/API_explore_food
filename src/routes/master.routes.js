const { Router } = require("express");
const MasterControllers = require("../controllers/masterControllers");
const masterRoutes = Router();
const masterControllers = new MasterControllers();
masterRoutes.get("/", masterControllers.index);
masterRoutes.post("/", masterControllers.create);
masterRoutes.delete("/:id", masterControllers.delete);
masterRoutes.patch("/:id", masterControllers.update);

module.exports = masterRoutes;
