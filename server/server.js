import dotenv from "dotenv";
import express from "express";
import connectToDb from "./config/db.js";
import CookieParser from "cookie-parser";
import cors from "cors";

import errorHandler from "./middleware/errorMiddleware.js";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";

// ## MIDDLEWARES
dotenv.config({ path: "./config.env" });

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(cors(corsOptions));

// ## ROUTES
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// ## ERROR HANDLER MIDDLEWARE
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
