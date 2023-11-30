const knex = require("../conexao");
const validarRequisicao = require("../intermediarios/validarRequisicao");

const listarProdutos = async (req, res) => {
    try {
        const { categoria_id } = req.query;
        if (categoria_id) {

            const categoriaValida = await knex("categorias").where({ id: categoria_id }).first();
            if (categoriaValida) {

                const query = await knex("produtos").select("*").from("produtos").where({ categoria_id: categoriaValida.id });
                return res.json(query);

            } else {
                return res.status(404).json({ mensagem: "A categoria informada é inválida." })
            }

        } else {
            const query = await knex("produtos").select("*").from("produtos");
            return res.json(query);
        }

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    listarProdutos
};