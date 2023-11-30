require('dotenv').config()
const knex = require('../conexao');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaEncontrada = await knex('categorias').where({ id: categoria_id }).first();

        if (!categoriaEncontrada) {
            return res.status(404).json({ mensagem: 'A categoria informada não foi encontrada' });
        }

        const produto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*')
       
        if (!produto[0]) {
            return res.status(400).json('O produto não foi cadastrado');
        }

        return res.status(201).json(produto[0]);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    cadastrarProduto
}