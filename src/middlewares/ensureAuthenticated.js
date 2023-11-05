const { verify } = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token not reported");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token");
  }
}

module.exports = ensureAuthenticated;
