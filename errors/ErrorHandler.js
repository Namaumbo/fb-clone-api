const HttpStatusCode = require("../Utils/HttpCodes");

class AppError extends Error {
  constructor(message, statusCode, name, code) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.name = name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(
      message || "Bad Request",
      HttpStatusCode.BAD_REQUEST,
      "BadRequestError",
      "BAD_REQUEST"
    );
  }
}

class UnprocessedEntities extends AppError {
  constructor(message) {
    super(
      message || "Bad Request",
      HttpStatusCode.UNPROCESSED_ENTITIES,
      "UnprocessedEntityError",
      "UNPROCESSED_ENTITIES"
    );
  }
}

class EntityAvailable extends AppError {
  constructor(message) {
    super(
      message || "Entity already Available",
      HttpStatusCode.ENTITY_CONFLICT,
      "EntityConflictError",
      "ENTITY_CONFLICT"
    );
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(
      message || "validation error",
      HttpStatusCode.NOT_FOUND,
      "ValidationError",
      "VALIDATION_ERROR"
    );
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(
      message || "entity not found",
      HttpStatusCode.NOT_FOUND,
      "NotFoundError",
      "NOT_FOUND"
    );
  }
}

class SequelizeValidationError extends AppError {
  constructor(message) {
    super(
      message || "fields can not be empty ",
      HttpStatusCode.UNPROCESSED_ENTITIES
    );
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  EntityAvailable,
  AppError,
  SequelizeValidationError,
  UnprocessedEntities,
};
