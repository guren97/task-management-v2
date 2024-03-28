import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";

import ErrorResponse from "../utils/errorResponse.js";
import generateToken from "../utils/generateToken.js";

// /**
//  * Registers a new user.
//  *
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  */
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    // Check if any required fields are missing
    if (!username || !first_name || !last_name || !email || !password) {
      return next(new ErrorResponse("All fields are required", 400)); // Changed status to 400 Bad Request
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const message =
        existingUser.username === username
          ? "User with this username already exists"
          : "User with this email already exists";
      return next(new ErrorResponse(message, 400)); // Changed status to 400 Bad Request
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword, // Remember to hash the password before storing it
    });

    // Send success response
    // Remove this token if do not want to redirected automatically to login
    generateToken(user, 201, res); // Changed status to 201 Created
  } catch (error) {
    console.error(error); // Log detailed error message
    return next(new ErrorResponse("Server Error", 500));
  }
});

// /**
//  * Logs in a user.
//  *
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  */
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    // Check if user exists
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    // Compare passwords if user exists
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return next(new ErrorResponse("Password do not match", 401));
    }

    generateToken(user, 200, res);
  } catch (error) {
    console.error(error); // Log detailed error message
    return next(new ErrorResponse("Server Error", 500));
  }
});

// /**
//  * Retrieves the current user.
//  *
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  */
const getCurrentUser = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve the user ID from the decoded JWT token
    const userId = req.user.id;

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");

    // Check if the user exists
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Send the user data in the response
    res.status(200).json({ user });
  } catch (error) {
    // Handle server errors
    return next(new ErrorResponse("Server Error", 500));
  }
});

// /**
//  * Logs out a user.
//  *
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  */
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
