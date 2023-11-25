const knex = require('../conexao');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const filtroLogin = async (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { rows, rowCount } = (await knex('usuarios')
            .select('*')
            .where('id', id));

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado.' })
        }

        req.usuario = {
            id,
            nome: rows[0].nome,
            email: rows[0].email
        };

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }
}

module.exports = filtroLogin;