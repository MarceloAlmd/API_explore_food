const AppError = require("../utils/appError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");

class UsersControllers {
  async create(request, response) {
    const { name, email, password, role } = request.body;

    const user = await knex("users").where({ email }).first();
    if (user) {
      throw new AppError("This email is already in use", 401);
    }

    const hashPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashPassword,
      role,
    });

    return response.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  }
}

module.exports = UsersControllers;
