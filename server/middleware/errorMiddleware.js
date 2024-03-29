import ErrorResponse from "../utils/errorResponse.js";
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  return error;
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = " Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };

// import ErrorResponse from "../utils/errorResponse.js";

// const errorHandler = (err, req, res, next) => {
//   let error = { ...err };

//   error.message = err.message;

//   if (err.code === 11000) {
//     const message = "Duplicate Field Value Entered";
//     error = new ErrorResponse(message, 400);
//   }

//   if (err.name === "ValidationError") {
//     // Map through all validation errors and extract their messages
//     const message = Object.values(err.errors).map((val) => val.message);
//     error = new ErrorResponse(message, 400);
//   }

//   // Ensure that the response is sent only once
//   if (!res.headersSent) {
//     res.status(error.statusCode || 500).json({
//       success: false,
//       error: error.message || "Server Error",
//     });
//   }
// };

// export default errorHandler;
