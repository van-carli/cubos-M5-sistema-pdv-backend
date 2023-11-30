require('dotenv').config();
const knex = require('../conexao');

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (!id) {
        return res.status(400).json({ mensagem: "É necessário informar o id do produto." })
    }

    try {
        const categoria = await knex('produtos')
            .select('categoria_id')
            .where()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}