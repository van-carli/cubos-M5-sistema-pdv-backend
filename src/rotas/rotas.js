const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
<<<<<<< HEAD
const verificarCadastro = require("../intermediarios/aut_usuario");
const userId = require("../intermediarios/autorizacao");
const { login, cadastrarUsuario } = require("../controladores/usuario");
=======
const userId = require('../intermediarios/autorizacao');
const { cadastrarUsuario } = require('../controladores/usuario');
const login = require("../controladores/autenticação");
>>>>>>> 417cd523bdccd03fcdabd8e2818d5865651146c0
const validarRequisicao = require("../intermediarios/validarRequisicao");
const usuarioSchema = require("../schemas/schemaUsuario");
const filtroLogin = require("../intermediarios/filtroLogin");
const loginSchema = require("../schemas/loginSchema");

const rotas = express();
rotas.get("/categoria", listarCategorias);

<<<<<<< HEAD
rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post("/login", login);
=======
rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rotas.post('/login', validarRequisicao(loginSchema), login);
>>>>>>> 417cd523bdccd03fcdabd8e2818d5865651146c0

rotas.use(filtroLogin);
rotas.use(userId);

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
