const Joi = require("joi");

const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
  
module.exports = {registrationSchema}