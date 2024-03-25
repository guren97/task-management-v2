import asyncHandler from "express-async-handler";
import Tasks from "../models/TaskSchema.js";

export const getAllTasks = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({ tasks });
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
});

export const setTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const task = await Tasks.create({ title, description });
    if (!task) {
      return next(new ErrorResponse("Please enter a task", 401));
    }
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
});

export const updateTask = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("Server Error", 500));
  }
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await Tasks.findByIdAndDelete(taskId);
    res.status(200).json({
      success: true,
      task: { title: task.title, status: "Task deleted successfully" },
    });
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
});
