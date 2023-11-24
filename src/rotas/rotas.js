const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
const {
  cadastrarUsuario,
  detalharUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("../controladores/usuario");

const rotas = express();

// rotas categoria
rotas.get("/categoria", listarCategorias);

// rotas usuario
rotas.post("/cadastro", cadastrarUsuario);
rotas.get("/usuario/:id", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);
rotas.put("/usuario", deletarUsuario);

module.exports = rotas;
