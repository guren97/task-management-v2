import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import ErrorResponse from "../utils/errorResponse.js";

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(new ErrorResponse("Token expired", 401));
      }
      return next(new ErrorResponse("Not Authorized, Invalid Token", 401));
    }
  } else {
    return next(new ErrorResponse("Not Authorized, Token not provided", 401));
  }
};
export default protect;
