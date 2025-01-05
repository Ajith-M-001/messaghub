export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500; // Default to 500 (Internal Server Error) if no status code is set
  const message = err.message || "Internal Server Error"; // Default error message

  // Send the error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Don't expose stack trace in production
  });
};
