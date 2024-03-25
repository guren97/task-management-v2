import asyncHandler from "express-async-handler";
import Tasks from "../models/TaskSchema.js";

const getAllTasks = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await Tasks.find();

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  res.send("Get All Tasks");
});

const setTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const task = await Tasks.create({ title, description });
    if (!task) {
      res.status(400);
      throw new Error("Please enter a task");
    }
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const updateTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Tasks.findById(taskId);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { title, description },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await Tasks.findByIdAndDelete(taskId);
    res.status(200).json({
      success: true,
      task: { title: task.title, status: "Task deleted successfully" },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  res.send("Delete Task");
});

export { getAllTasks, setTask, updateTask, deleteTask };
