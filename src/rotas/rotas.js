const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
const verificarCadastro = require("../intermediarios/aut_usuario");
const userId = require('../intermediarios/autorizacao');
const { login } = require('../controladores/usuario');

const rotas = express();

rotas.post('/login', login);

rotas.use(verificarCadastro);
rotas.use(userId);

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
