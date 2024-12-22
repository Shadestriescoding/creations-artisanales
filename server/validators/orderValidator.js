const Joi = require('joi');

const addressSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Le prénom doit contenir au moins {#limit} caractères',
      'string.max': 'Le prénom ne peut pas dépasser {#limit} caractères',
      'any.required': 'Le prénom est requis'
    }),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Le nom doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom ne peut pas dépasser {#limit} caractères',
      'any.required': 'Le nom est requis'
    }),

  address: Joi.string()
    .required()
    .messages({
      'any.required': 'L\'adresse est requise'
    }),

  city: Joi.string()
    .required()
    .messages({
      'any.required': 'La ville est requise'
    }),

  postalCode: Joi.string()
    .pattern(/^[0-9]{5}$/)
    .required()
    .messages({
      'string.pattern.base': 'Le code postal doit contenir 5 chiffres',
      'any.required': 'Le code postal est requis'
    }),

  country: Joi.string()
    .default('France'),

  phone: Joi.string()
    .pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
    .messages({
      'string.pattern.base': 'Le numéro de téléphone n\'est pas valide'
    })
});

const orderItemSchema = Joi.object({
  product: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'ID de produit invalide',
      'any.required': 'Le produit est requis'
    }),

  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'La quantité doit être un nombre',
      'number.integer': 'La quantité doit être un nombre entier',
      'number.min': 'La quantité minimale est de 1',
      'any.required': 'La quantité est requise'
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Le prix doit être un nombre',
      'number.min': 'Le prix ne peut pas être négatif',
      'any.required': 'Le prix est requis'
    }),

  customizations: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      value: Joi.string().required()
    })
  )
});

const orderSchema = Joi.object({
  customer: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'ID client invalide',
      'any.required': 'Le client est requis'
    }),

  items: Joi.array()
    .items(orderItemSchema)
    .min(1)
    .required()
    .messages({
      'array.min': 'La commande doit contenir au moins un article',
      'any.required': 'Les articles sont requis'
    }),

  shippingAddress: addressSchema.required(),
  billingAddress: addressSchema.optional(),

  payment: Joi.object({
    method: Joi.string()
      .valid('card', 'paypal', 'bank_transfer')
      .required()
      .messages({
        'any.only': 'Méthode de paiement invalide',
        'any.required': 'La méthode de paiement est requise'
      }),

    status: Joi.string()
      .valid('pending', 'completed', 'failed', 'refunded')
      .default('pending'),

    transactionId: Joi.string().optional(),
    paidAt: Joi.date().optional()
  }),

  shipping: Joi.object({
    method: Joi.string()
      .required()
      .messages({
        'any.required': 'La méthode de livraison est requise'
      }),

    cost: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.min': 'Les frais de livraison ne peuvent pas être négatifs',
        'any.required': 'Les frais de livraison sont requis'
      }),

    trackingNumber: Joi.string().optional(),
    carrier: Joi.string().optional(),
    estimatedDelivery: Joi.date().optional(),
    shippedAt: Joi.date().optional(),
    deliveredAt: Joi.date().optional()
  }),

  notes: Joi.object({
    customer: Joi.string().optional(),
    admin: Joi.string().optional()
  }),

  metadata: Joi.object({
    source: Joi.string().optional(),
    userAgent: Joi.string().optional(),
    ipAddress: Joi.string().optional()
  })
}).options({ stripUnknown: true });

const orderUpdateSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')
    .messages({
      'any.only': 'Statut de commande invalide'
    }),

  shipping: Joi.object({
    trackingNumber: Joi.string(),
    carrier: Joi.string(),
    estimatedDelivery: Joi.date(),
    shippedAt: Joi.date(),
    deliveredAt: Joi.date()
  }),

  notes: Joi.object({
    admin: Joi.string()
  }),

  refund: Joi.object({
    amount: Joi.number().min(0),
    reason: Joi.string(),
    status: Joi.string().valid('pending', 'completed', 'rejected')
  })
}).options({ stripUnknown: true });

exports.validateOrder = (order) => {
  return orderSchema.validate(order, { abortEarly: false });
};

exports.validateOrderUpdate = (orderUpdate) => {
  return orderUpdateSchema.validate(orderUpdate, { abortEarly: false });
}; 