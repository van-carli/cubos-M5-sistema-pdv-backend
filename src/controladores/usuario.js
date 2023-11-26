const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioEncontrado = await knex("usuarios").where({ email }).first();

    if (usuarioEncontrado) {
      return res.status(400).json("O email já existe");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning("*");

    const { senha: _, ...usuarioCadastrado } = usuario[0];

    return res.status(201).json(usuarioCadastrado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editarUsuario = async (req,res) => {

    const { nome, email, senha } = req.body;

      try{
        
        const emailExiste = await knex('usuarios').select('*').where('email', email);

        
        if (emailExiste.length > 0) {
          return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
        }
  
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        
        const usr = await knex('usuarios').update({nome, email, senha:senhaCriptografada}).where('id', req.usuario.id).returning("*");
 
        delete usr[0].senha;
        return res.status(200).json(usr);
  
      }catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
      }
  }

module.exports = {

    editarUsuario,
    cadastrarUsuario
}

