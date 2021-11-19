// Do NOT make any changes to this file!

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = ApiError;