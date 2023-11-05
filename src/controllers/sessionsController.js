const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (user.role === "disabled") {
      throw new AppError("Your profile has been deactivated");
    }

    if (!user) {
      throw new AppError("Incorrect email or password");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("Incorrect email or password");
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
