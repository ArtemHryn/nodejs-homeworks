const Joi = require("joi");

const updateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { updateContactFavoriteSchema };
