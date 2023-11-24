const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const login = async (req, res) => {
    const { email, senha } = req.body;

    console.log(email, senha)

    try {
        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
        }

        const usuario = await knex('usuarios')
            .select('*')
            .where('email', email);

        if (usuario.length < 1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario[0].senha);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const token = jwt.sign({ id: usuario[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED });

        const { senha: _, ...usuarioLogado } = usuario[0];

        return res.json({ usuario: usuarioLogado, token });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const editarUsuario = async (req,res) => {

    const { nome, email, senha } = req.body;
  
      if(!nome || nome==='' || !email || email==='' || !senha || senha===''){
          return res.status(400).json({mensagem: 'Todos os campos são obrigatórios!'});
      }
  
      try{
  
        const emailExiste = await knex('usuarios').select('*').where('email', email);
        
        if (emailExiste.rowCount > 0) {
          return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
        }
  
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        const usr = await knex('usuarios').update({nome, email, senhaCriptografada}).where('id', req.usuario.id)
        
        delete usr.rows[0].senha;
        return res.status(200).json(usr.rows[0]);
  
      }catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
      }
  }

module.exports = {
    login,
    editarUsuario
}