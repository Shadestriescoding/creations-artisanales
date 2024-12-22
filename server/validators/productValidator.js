const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
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

  shortDescription: Joi.string()
    .max(160)
    .required()
    .messages({
      'string.max': 'La description courte ne peut pas dépasser {#limit} caractères',
      'any.required': 'La description courte est requise'
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.min': 'Le prix ne peut pas être négatif',
      'any.required': 'Le prix est requis'
    }),

  compareAtPrice: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.min': 'Le prix barré ne peut pas être négatif'
    }),

  category: Joi.string()
    .required()
    .messages({
      'any.required': 'La catégorie est requise'
    }),

  tags: Joi.array()
    .items(Joi.string().trim())
    .optional(),

  status: Joi.string()
    .valid('draft', 'published', 'archived')
    .default('draft')
    .messages({
      'any.only': 'Le statut doit être draft, published ou archived'
    }),

  inventory: Joi.object({
    quantity: Joi.number()
      .min(0)
      .default(0)
      .messages({
        'number.min': 'La quantité ne peut pas être négative'
      }),

    sku: Joi.string()
      .pattern(/^[A-Za-z0-9-_]+$/)
      .optional()
      .messages({
        'string.pattern.base': 'Le SKU ne peut contenir que des lettres, chiffres, tirets et underscores'
      }),

    allowBackorder: Joi.boolean()
      .default(false),

    lowStockThreshold: Joi.number()
      .min(0)
      .default(5)
      .messages({
        'number.min': 'Le seuil de stock bas ne peut pas être négatif'
      })
  }),

  dimensions: Joi.object({
    height: Joi.number().optional(),
    width: Joi.number().optional(),
    length: Joi.number().optional(),
    weight: Joi.number().optional()
  }),

  customizations: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      options: Joi.array().items(Joi.string()).required(),
      required: Joi.boolean().default(false)
    })
  ),

  seo: Joi.object({
    title: Joi.string()
      .max(60)
      .optional()
      .messages({
        'string.max': 'Le titre SEO ne peut pas dépasser {#limit} caractères'
      }),

    description: Joi.string()
      .max(160)
      .optional()
      .messages({
        'string.max': 'La description SEO ne peut pas dépasser {#limit} caractères'
      }),

    keywords: Joi.array()
      .items(Joi.string())
      .optional()
  }),

  imagesToDelete: Joi.string().optional() // Pour la mise à jour des images
}).options({ stripUnknown: true });

exports.validateProduct = (product) => {
  return productSchema.validate(product, { abortEarly: false });
}; 