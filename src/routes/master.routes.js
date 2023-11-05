const { Router } = require("express");
const MasterControllers = require("../controllers/masterControllers");
const masterRoutes = Router();
const masterControllers = new MasterControllers();
masterRoutes.get("/", masterControllers.index);
masterRoutes.post("/", masterControllers.create);

module.exports = masterRoutes;
