class MainError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}

// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.status = 400;
//   }
// }

// class NotFoundContact extends MainError {
//   constructor(message) {
//     super(message);
//     this.status = 400;
//   }
// }

// class FailedToUpdate extends MainError {
//   constructor(message) {
//     super(message);
//     this.status = 400;
//   }
// }

// class Conflict extends MainError {
//   constructor(message) {
//     super(message);
//     this.status = 409;
//   }
// }

// class NotAuthorizedError extends MainError {
//   constructor(message) {
//     super(message);
//     this.status = 401;
//   }
// }

module.exports = {
  // ValidationError,
  // NotFoundContact,
  // FailedToUpdate,
  // Conflict,
  MainError,
  // NotAuthorizedError,
};
