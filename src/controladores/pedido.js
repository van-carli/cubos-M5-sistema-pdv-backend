require("dotenv").config();
const knex = require("../conexao");

const cadastroPedido = async (req, res) => {
  const objetoPedido = req.body;
  try {
    const idCLiente = await validarIdCliente(objetoPedido.cliente_id);
    if (!idCLiente) {
      return res
        .status(404)
        .json({ mensagem: "Não existe cliente com Id informado" });
    }

    let valorTotalPedido = 0;
    for (const produto of objetoPedido.pedido_produtos) {
      const produtoDb = await buscarProdutoPorId(produto.produto_id);
      if (!produtoDb) {
        return res.status(404).json({
          mensagem: `O id do produto informado '${produto.produto_id}', não está vinculado a nenhum produto`,
        });
      }

      if (produto.quantidade_produto > produtoDb.quantidade_estoque) {
        return res.status(400).json({
          mensagem: "A quantidade do produto em estoque é inferior ao pedido",
        });
      }

      produto.valor = produtoDb.valor;
      valorTotalPedido += produtoDb.valor * produto.quantidade_produto;
    }
    const pedidoCadastrado = await cadastrarPedido(
      objetoPedido,
      valorTotalPedido
    );

    return res.json(pedidoCadastrado);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

const listarPedido = async (req, res) => {};

module.exports = {
  listarPedido,
  cadastroPedido,
};
