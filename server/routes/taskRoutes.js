import express from "express";
import protect from "../middleware/authMiddleware.js";
const taskRouter = express.Router();

import {
  getAllTasks, // Make sure this import is correct
  setTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

taskRouter.route("/").get(protect, getAllTasks);
taskRouter.route("/").post(protect, setTask);
taskRouter.route("/:id").put(protect, updateTask);
taskRouter.route("/:id").delete(protect, deleteTask);

export default taskRouter;
