export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500; // Default to 500 (Internal Server Error) if no status code is set
  const message = err.message || "Internal Server Error"; // Default error message

  if (err.code === 11000) {
    const error = Object.keys(err.keyValue).join(", ");
    return res.status(400).json({
      success: false,
      status: 400,
      message: `${error} already exists`,
    });
  }

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    return res.status(400).json({
      success: false,
      status: 400,
      message,
    });
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Don't expose stack trace in production
  });
};
