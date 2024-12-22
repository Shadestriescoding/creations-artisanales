const Joi = require('joi');

const settingsSchema = Joi.object({
  siteName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(''),
  address: Joi.string().allow(''),
  notificationsEnabled: Joi.boolean(),
  maintenanceMode: Joi.boolean(),
  socialMedia: Joi.object({
    instagram: Joi.string().uri().allow(''),
    facebook: Joi.string().uri().allow(''),
    pinterest: Joi.string().uri().allow('')
  }),
  seo: Joi.object({
    metaDescription: Joi.string().max(160).allow(''),
    keywords: Joi.string().max(200).allow('')
  })
});

exports.validateSettings = (settings) => {
  return settingsSchema.validate(settings, { abortEarly: false });
}; 