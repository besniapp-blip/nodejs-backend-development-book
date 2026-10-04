export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    Number.isInteger(err.statusCode) && err.statusCode >= 400
      ? err.statusCode
      : 500;

  const message =
    statusCode === 500 && !err.isOperational
      ? "Internal server error"
      : err.message;

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
}
