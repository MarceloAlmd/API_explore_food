const { Router } = require("express");
const usersRoutes = Router();

usersRoutes.get("/", (request, response) => {
  return response.json({
    users: "admin",
  });
});

module.exports = usersRoutes;
