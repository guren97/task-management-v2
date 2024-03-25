import dotenv from "dotenv";
import express from "express";
import connectToDb from "./config/db.js";

import tastkRouter from "./routes/taskRoute.js";

// ## MIDDLEWARES
dotenv.config({ path: "./config.env" });
const app = express();

// ## ROUTES
app.use("/api", tastkRouter);

// ## ERROR HANDLER MIDDLEWARE

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
