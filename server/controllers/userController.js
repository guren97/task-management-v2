import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import User from "../models/UserSchema.js";
import ErrorResponse from "../utils/errorResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    // Check if any required fields are missing
    if (!username || !first_name || !last_name || !email || !password) {
      return next(new ErrorResponse("All fields are required", 401));
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const message =
        existingUser.username === username
          ? "User with this username already exists"
          : "User with this email already exists";
      return next(new ErrorResponse(message, 401));
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
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error); // Log detailed error message
    return next(new ErrorResponse("Server Error", 500));
  }
});

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

    res.json("logged in");
  } catch (error) {
    console.error(error); // Log detailed error message
    return next(new ErrorResponse("Server Error", 500));
  }
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  res.json("Get current User");
});

export { registerUser, loginUser, getCurrentUser };
