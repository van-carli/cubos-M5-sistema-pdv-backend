const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const listarClientes = async (req, res) => {
  try {

    const clientes = await knex("clientes").select("*");

    return res.status(200).json({ clientes });

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro no servidor!" });
  }

};

module.exports = {
  listarClientes
};


