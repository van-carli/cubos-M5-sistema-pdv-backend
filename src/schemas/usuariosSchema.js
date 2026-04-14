const joi = require('joi')

const usuarioSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }), 
    email: joi.string().email().required().messages({
        'string.email': 'E-mail inválido',
        'string.empty': 'O campo e-mail é obrigatório.',
        'any.required': 'O campo e-mail é obrigatório.'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.'
    }),
    
})

module.exports = usuarioSchema
