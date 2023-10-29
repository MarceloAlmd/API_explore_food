class UsersControllers {
  async create(request, response) {
    return response.json({
      status: "sucesso",
      message: "usuário criado com sucesso",
    });
  }
}

module.exports = UsersControllers;
