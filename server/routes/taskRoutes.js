import express from "express";
const taskRouter = express.Router();

import {
  getAllTasks, // Make sure this import is correct
  setTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

taskRouter.route("/").get(getAllTasks);
taskRouter.route("/").post(setTask);
taskRouter.route("/:id").put(updateTask);
taskRouter.route("/:id").delete(deleteTask);

export default taskRouter;
