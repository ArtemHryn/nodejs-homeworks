const Joi = require("joi");

const validationAddContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const validationUpdateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

module.exports = {
  validationAddContact,
  validationUpdateContact,
};
