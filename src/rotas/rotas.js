const express = require("express");
const { listarCategorias } = require("../controladores/categoria");

const validarRequisicao = require("../intermediarios/validarRequisicao");
const usuarioSchema = require("../schemas/schemaUsuario");
const filtroLogin = require("../intermediarios/filtroLogin");
const loginSchema = require("../schemas/loginSchema");
const { cadastrarUsuario, editarUsuario } = require("../controladores/usuario");
const login = require("../controladores/autenticação");

const rotas = express();
rotas.get("/categoria", listarCategorias);

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post("/login", validarRequisicao(loginSchema), login);

rotas.use(filtroLogin);
rotas.put("/usuario", validarRequisicao(usuarioSchema), editarUsuario);

module.exports = rotas;
