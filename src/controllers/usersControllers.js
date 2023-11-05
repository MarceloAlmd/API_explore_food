const AppError = require("../utils/appError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

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

  async update(request, response) {
    const { name, email, current_password, new_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("User not found");
    }

    if (email) {
      const checkEmail = await knex("users").where({ email }).first();
      if (checkEmail && checkEmail.id !== user.id) {
        throw new AppError("This Email is already in use.");
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (current_password && !new_password) {
      throw new AppError("Enter your new password");
    }

    if (!current_password && new_password) {
      throw new AppError("Enter your current password");
    }

    if (current_password && new_password) {
      const checkCurrentPassword = await compare(
        current_password,
        user.password
      );

      if (!checkCurrentPassword) {
        throw new AppError("The current password is invalid");
      }

      user.password = await hash(new_password, 8);
    }

    await knex("users").where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    });

    return response.json({
      message: "User updated successfully",
      user,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (user.role === "admin") {
      throw new AppError("Only master users can delete an admin");
    }

    await knex("users").where({ id }).delete();

    return response.json({
      message: "User deleted successfully",
    });
  }
}

module.exports = UsersControllers;
