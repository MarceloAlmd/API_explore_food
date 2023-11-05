const knex = require("../database/knex");

class MasterControllers {
  async index(request, response) {
    const users = await knex("users");

    return response.json(users);
  }
}

module.exports = MasterControllers;
