const { Router } = require("express");
const MasterControllers = require("../controllers/masterControllers");
const masterRoutes = Router();
const masterControllers = new MasterControllers();
masterRoutes.get("/", masterControllers.index);

module.exports = masterRoutes;
