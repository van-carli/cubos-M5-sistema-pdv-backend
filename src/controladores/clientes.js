const knex = require("../conexao");

require("dotenv").config();

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const emailEncontrado = await knex("clientes").where({ email }).first();

    if (emailEncontrado) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const cpfEncontrado = await knex("clientes").where({ cpf }).first();

    if (cpfEncontrado) {
      return res.status(400).json({ mensagem: "Este CPF já está em uso." });
    }

    const numeroNulo = numero === "" ? null : numero;

    const novoCliente = await knex("clientes")
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero: numeroNulo,
        bairro,
        cidade,
        estado,
      })
      .returning("*");

    return res.status(201).json(novoCliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const clientesDetalhado = await knex("clientes").where({ id }).first();

    return res.json(clientesDetalhado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarCliente,
  detalharCliente,
};
