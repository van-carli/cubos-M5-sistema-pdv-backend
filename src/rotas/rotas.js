const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
const verificarCadastro = require("../intermediarios/aut_usuario");
const userId = require('../intermediarios/autorizacao');
const { login, cadastrarUsuario } = require('../controladores/usuario');
const validarRequisicao = require("../intermediarios/validarRequisicao");
const usuarioSchema = require("../schemas/schemaUsuario");

const rotas = express();

rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rotas.post('/login', login);

rotas.use(verificarCadastro);
rotas.use(userId);

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
