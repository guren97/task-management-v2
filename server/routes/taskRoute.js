import express from "express";
const tastkRouter = express.Router();

import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

tastkRouter.route("/tasks").get(getAllTasks);
tastkRouter.route("/task").post(addTask);
tastkRouter.route("/task/:id").put(updateTask);
tastkRouter.route("/task/:id").delete(deleteTask);

export default tastkRouter;
