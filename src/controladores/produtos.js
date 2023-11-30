require('dotenv').config();
const knex = require('../conexao');

const listarProdutos = async (req, res) => {
    // try {
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

    // } catch (error) {
    //     return res.status(500).json({ mensagem: "Erro interno do servidor" });
    // }
}

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

const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    console.log(id)
    if (!id) {
        return res.status(400).json('É necessário informar o id do produto');
    }

    // try {
    const categoria = await knex('categoria')
        .select('descricao').where('id', categoria_id);

    console.log(categoria)

    if (!categoria) {
        return res.status(404).json({ mensagem: 'A categoria informada não foi encontrada' });
    }

    const produtoAtualizado = await knex('produtos')
        .update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        })
        .where('id', id)
        .returning('*');

    return res.status(200).json(produtoAtualizado);
    // } catch (error) {
    //     return res.status(500).json({ mensagem: "Erro interno do servidor" });
    // }
}

module.exports = {
    listarProdutos,
    cadastrarProduto,
    editarProduto
};