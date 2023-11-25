const jwt = require("jsonwebtoken");
require("dotenv").config();

const usuario_id = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.split(" ")[1];

  const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const usuarioId = tokenDecodificado.id;

  req.usuario_id = usuarioId;

  next();
};

module.exports = usuario_id;
