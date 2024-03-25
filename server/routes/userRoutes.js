import express from "express";
const userRouter = express.Router();

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/userController.js";

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/current").get(getCurrentUser);

export default userRouter;
