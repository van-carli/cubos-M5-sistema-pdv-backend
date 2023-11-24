const express = require("express");
const { listarCategorias } = require("../controladores/categoria");

const rotas = express();

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
