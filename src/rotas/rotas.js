const express = require("express");
const { listarCategorias } = require("../controladores/categoria");
const validarRequisicao = require("../intermediarios/validarRequisicao");
const usuarioSchema = require("../schemas/usuariosSchema");
const loginSchema = require("../schemas/loginSchema");
const login = require("../controladores/login");
const { cadastrarUsuario, editarUsuario, detalharUsuario } = require("../controladores/usuario");
const loginAutenticacao = require("../intermediarios/loginAutenticacao");
const { listarProdutos, cadastrarProduto, editarProduto } = require("../controladores/produtos");
const cadastrarCliente = require("../controladores/clientes");
const clienteSchema = require("../schemas/clientesSchema");
const produtoSchema = require("../schemas/produtosSchema");

const rotas = express();

rotas.get("/categoria", listarCategorias);

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post("/login", validarRequisicao(loginSchema), login);

rotas.use(loginAutenticacao);
rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarRequisicao(usuarioSchema), editarUsuario);

rotas.get("/produto", listarProdutos);
rotas.post("/produto", validarRequisicao(produtoSchema), cadastrarProduto);
rotas.put('produto/:id', validarRequisicao(produtoSchema), editarProduto);

rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente);

module.exports = rotas;