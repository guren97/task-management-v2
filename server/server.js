import dotenv from "dotenv";
import express from "express";
import connectToDb from "./config/db.js";
import CookieParser from "cookie-parser";
import cors from "cors";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";

// ## MIDDLEWARES
dotenv.config({ path: "./config.env" });

// // Allow requests from http://localhost:5173
// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

const app = express();
// // Middleware
app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);
// ## ROUTES
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// ## ERROR HANDLER MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

// ## CREATE - Start Server Function
const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await connectToDb();
    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    throw new Error("Error: Cannot start server");
  }
};

// ## START - Start Server
startServer();
