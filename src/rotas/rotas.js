const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
const userId = require('../intermediarios/autorizacao');
const { cadastrarUsuario, editarUsuario } = require('../controladores/usuario');
const login = require("../controladores/autenticação");
const validarRequisicao = require("../intermediarios/validarRequisicao");
const usuarioSchema = require("../schemas/schemaUsuario");
const filtroLogin = require("../intermediarios/filtroLogin");
const loginSchema = require("../schemas/loginSchema");

const rotas = express();

rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario)
rotas.post('/login', validarRequisicao(loginSchema), login);

rotas.use(filtroLogin);
rotas.put('usuario', validarRequisicao(usuarioSchema), editarUsuario)
rotas.use(userId);

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
