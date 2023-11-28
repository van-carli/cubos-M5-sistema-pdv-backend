const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
const validarRequisicao = require("../intermediarios/validarRequisicao");
const usuarioSchema = require("../schemas/usuariosSchema");
const loginSchema = require("../schemas/loginSchema");
const login = require("../controladores/login");
const {
  cadastrarUsuario,
  editarUsuario,
  detalharUsuario,
} = require("../controladores/usuario");
const loginAutenticacao = require("../intermediarios/loginAutenticacao");

const rotas = express();
rotas.get("/categoria", listarCategorias);

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post("/login", validarRequisicao(loginSchema), login);

rotas.use(loginAutenticacao);
rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarRequisicao(usuarioSchema), editarUsuario);

module.exports = rotas;
