import express from "express";
const tastkRouter = express.Router();

import {
  getAllTasks,
  setTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

tastkRouter.route("/").get(getAllTasks);
tastkRouter.route("/").post(setTask);
tastkRouter.route("/:id").put(updateTask);
tastkRouter.route("/:id").delete(deleteTask);

export default tastkRouter;
