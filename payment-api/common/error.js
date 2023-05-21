class NotFoundError extends Error {
  constructor(args) {
    super(args);
  }
}

module.exports = { NotFoundError };
