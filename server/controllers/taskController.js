import asyncHandler from "express-async-handler";
import Task from "../models/taskSchema.js";

const getAllTasks = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  try {
  } catch (error) {}
  res.send("Get All Tasks");
});

const addTask = asyncHandler(async (req, res, next) => {
  res.send("Add Task");
});

const updateTask = asyncHandler(async (req, res, next) => {
  res.send("Update Task");
});

const deleteTask = asyncHandler(async (req, res, next) => {
  res.send("Delete Task");
});

export { getAllTasks, addTask, updateTask, deleteTask };
