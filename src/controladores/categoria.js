const knex = require("../conexao");

const listarCategorias = async (req, res) => {
  try {
    const query = await knex("categorias").select("*").from("categorias");

    res.status(200).json(query);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  listarCategorias,
};
