const joi = require('joi');

const produtoSchema = joi.object({
    descricao: joi.string().min(3).required().messages({
        'string.min': 'O campo descrição deve ser preenchido corretamente',
        'any.required': 'O campo descrição é obrigatório.',
        'string.empty': 'O campo descrição é obrigatório.'
    }),
    quantidade_estoque: joi.number().required().messages({
        'string.empty': 'O campo e-mail é obrigatório.',
        'any.required': 'O campo e-mail é obrigatório.'
    }),
    valor: joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.min': 'O campo senha deve conter no mínimo 5 caracteres.'
    }),
    categoria_id: joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.min': 'O campo senha deve conter no mínimo 5 caracteres.'
    })
})

module.exports = produtoSchema;