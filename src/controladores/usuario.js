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

module.exports = {
    login
}