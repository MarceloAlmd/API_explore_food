const { hash } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/appError");
class MasterControllers {
  async create(request, response) {
    const { name, email, password, role = "admin" } = request.body;

    const user = await knex("users").where({ email }).first();

    if (user) {
      throw new AppError("This user is already registered");
    }

    const hashPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashPassword,
      role,
    });

    return response.json({
      message: "administrative user created successfully",
    });
  }

  async index(request, response) {
    const users = await knex("users");

    return response.json(users);
  }
}

module.exports = MasterControllers;
