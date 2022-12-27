const { ValidationError } = require("../helper/errors");
const AddContactSchema = require("../utils/validation/addContactValidationSchema");
const {
  updateContactFavoriteSchema,
} = require("../utils/validation/updateContactFavoriteSchema");
const {
  updateContactSchema,
} = require("../utils/validation/updateContactValidation");

const validateAddContact = (req, res, next) => {
  const validationResult = AddContactSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details)));
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  const validationResult = updateContactSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details)));
  }
  next();
};

const validateUpdateContactFavorite = (req, res, next) => {
  const validationResult = updateContactFavoriteSchema.validate(req.body);
  if (validationResult.error) {
    throw new ValidationError("missing field favorite");
  }
  next()
};

module.exports = {
  validateAddContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
};
