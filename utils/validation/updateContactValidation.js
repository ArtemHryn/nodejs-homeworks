const Joi = require("joi");

  const updateContactSchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });

module.exports = { updateContactSchema };
