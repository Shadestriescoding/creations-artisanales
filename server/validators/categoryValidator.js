const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Le nom doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom ne peut pas dépasser {#limit} caractères',
      'any.required': 'Le nom est requis'
    }),

  description: Joi.string()
    .required()
    .messages({
      'any.required': 'La description est requise'
    }),

  parent: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null)
    .messages({
      'string.pattern.base': 'ID de catégorie parente invalide'
    }),

  icon: Joi.string()
    .allow('')
    .max(10)
    .messages({
      'string.max': 'L\'icône ne peut pas dépasser {#limit} caractères'
    }),

  displayOrder: Joi.number()
    .min(0)
    .default(0)
    .messages({
      'number.min': 'L\'ordre d\'affichage ne peut pas être négatif'
    }),

  isActive: Joi.boolean()
    .default(true),

  seo: Joi.object({
    title: Joi.string()
      .max(60)
      .allow('')
      .messages({
        'string.max': 'Le titre SEO ne peut pas dépasser {#limit} caractères'
      }),

    description: Joi.string()
      .max(160)
      .allow('')
      .messages({
        'string.max': 'La description SEO ne peut pas dépasser {#limit} caractères'
      }),

    keywords: Joi.array()
      .items(Joi.string().max(50))
      .max(10)
      .messages({
        'array.max': 'Le nombre maximum de mots-clés est de {#limit}'
      })
  }),

  customFields: Joi.array().items(
    Joi.object({
      name: Joi.string()
        .required()
        .messages({
          'any.required': 'Le nom du champ personnalisé est requis'
        }),

      type: Joi.string()
        .valid('text', 'number', 'boolean', 'select')
        .default('text')
        .messages({
          'any.only': 'Type de champ personnalisé invalide'
        }),

      options: Joi.array()
        .items(Joi.string())
        .when('type', {
          is: 'select',
          then: Joi.array().min(1).required(),
          otherwise: Joi.array().max(0)
        })
        .messages({
          'array.min': 'Au moins une option est requise pour un champ de type select',
          'array.max': 'Les options ne sont autorisées que pour les champs de type select'
        }),

      required: Joi.boolean()
        .default(false)
    })
  )
}).options({ stripUnknown: true });

exports.validateCategory = (category) => {
  return categorySchema.validate(category, { abortEarly: false });
}; 