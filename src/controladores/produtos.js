require("dotenv").config();

const knex = require("../configs/conexao");

const multer = require("../multer");
const b2Conexao = require('../armazenamento');


const listarProdutos = async (req, res) => {
  try {
    const { categoria_id } = req.query;
    if (categoria_id) {
      const categoriaValida = await knex("categorias")
        .where({ id: categoria_id })
        .first();

      if (categoriaValida) {
        const query = await knex("produtos")
          .select("*")
          .from("produtos")
          .where({ categoria_id: categoriaValida.id });

        return res.json(query);
      } else {
        return res
          .status(404)
          .json({ mensagem: "A categoria informada é inválida." });
      }
    } else {
      const query = await knex("produtos").select("*").from("produtos");
      return res.json(query);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const imagem = req.file;

  try {
    const categoriaEncontrada = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!categoriaEncontrada) {
      return res
        .status(404)
        .json({ mensagem: "A categoria informada não foi encontrada" });
    }

    let produtoInserido;

    if (imagem) {
      const { nomeOriginal, buffer } = imagem;
      const arquivoNome = `produto_${Date.now()}_${nomeOriginal}`;

      await b2Conexao.autenticarB2();
      const upload = await b2Conexao.uploadParaB2(arquivoNome, buffer);

      produtoInserido = await knex("produtos")
        .insert({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: upload.dataInfo.url,
        })
        .returning("*");
    } else {
      produtoInserido = await knex("produtos")
        .insert({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
        })
        .returning("*");
    }

    if (!produtoInserido[0]) {
      return res.status(400).json("O produto não foi cadastrado");
    }

    return res.status(201).json(produtoInserido[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoDetalhado = await knex("produtos").where({ id }).first();

    if (!produtoDetalhado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(produtoDetalhado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const imagem = req.file;

  try {
    const categoria = await knex("categorias")
      .select("descricao")
      .where("id", categoria_id);

    if (!categoria) {
      return res
        .status(404)
        .json({ mensagem: "A categoria informada não foi encontrada" });
    }

    const produto = await knex("produtos")
      .select("descricao", "produto_imagem")
      .where("id", id)
      .first();

    if (!produto) {
      return res
        .status(400)
        .json({ mensagem: "Este produto ainda não foi cadastrado" });
    }

    let produtoAtualizado;

    if (imagem) {
      const { nomeOriginal, buffer } = imagem;
      const nomeArquivo = `produto_${Date.now()}_${nomeOriginal}`;

      await b2Conexao.autenticarB2();
      const uploadResponse = await b2Conexao.uploadParaB2(nomeArquivo, buffer);

      produtoAtualizado = await knex("produtos")
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: uploadResponse.dataInfo.url,
        })
        .where("id", id)
        .returning("*");
    } else {
      produtoAtualizado = await knex("produtos")
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
        })
        .where("id", id)
        .returning("*");
    }

    return res.status(200).json(produtoAtualizado[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos")
      .select("descricao")
      .where({ id })
      .first();

    if (!produto) {
      return res
        .status(400)
        .json({ mensagem: "Este produto ainda não foi cadastrado" });
    }

    const produtoExcluido = await knex("produtos").where({ id }).del();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  listarProdutos,
  cadastrarProduto,
  detalharProduto,
  editarProduto,
  excluirProduto,
};