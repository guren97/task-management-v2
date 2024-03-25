import express from "express";
const userRouter = express.Router();
import protect from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/userController.js";

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/current").get(protect, getCurrentUser);

export default userRouter;
