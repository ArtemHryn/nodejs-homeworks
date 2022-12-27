class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundContact extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class FailedToUpdate extends Error{
  constructor(message) {
    super(message)
    this.status = 400
  }
}

module.exports = {
  ValidationError,
  NotFoundContact,
  FailedToUpdate,
};
