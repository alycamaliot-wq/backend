class BaseError extends Error {
  constructor(status, message, errors) {
    super(message)
    this.status = status
    this.errors = errors
  }
  static ExistUser(message) {
    return new BaseError(409, message)
  }
  static BadRequest(message, error = []) {
    return new BaseError(400, message, error)
  }
  static NotFound(message) {
    return new BaseError(404, message)
  }
  static UnAuthorized(message) {
    return new BaseError(401, message)
  }
}

module.exports = BaseError
