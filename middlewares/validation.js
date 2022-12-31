const { ValidationError } = require("../helper/errors");
const AddContactSchema = require("../helper/contactValidation/addContactValidationSchema");
const {
  updateContactFavoriteSchema,
} = require("../helper/contactValidation/updateContactFavoriteSchema");
const {
  updateContactSchema,
} = require("../helper/contactValidation/updateContactValidation");
const {
  registrationSchema,
} = require("../helper/authValidation/registrationValidationSchema");
const {
  loginValidationScheme,
} = require("../helper/authValidation/loginValidationSchema");
const { subscriptionValidationSchema } = require("../helper/authValidation/subValidationSchema");

const validateAddContact = (req, res, next) => {
  const validationResult = AddContactSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  const validationResult = updateContactSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }
  next();
};

const validateUpdateContactFavorite = (req, res, next) => {
  const validationResult = updateContactFavoriteSchema.validate(req.body);
  if (validationResult.error) {
    throw new ValidationError("missing field favorite");
  }
  next();
};

const validationRegistration = (req, res, next) => {
  const validationResult = registrationSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }
  next();
};

const validationLogin = (req, res, next) => {
  const validationResult = loginValidationScheme.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }
  next();
};

const validationSub = (req, res, next) => {
  const validationResult = subscriptionValidationSchema.validate(req.query);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }
  next();
};

module.exports = {
  validateAddContact,
  validateUpdateContact,
  validateUpdateContactFavorite,
  validationRegistration,
  validationLogin,
  validationSub,
};
