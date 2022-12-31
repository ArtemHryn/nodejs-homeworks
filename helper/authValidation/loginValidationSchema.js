const Joi = require("joi");

const loginValidationScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { loginValidationScheme };