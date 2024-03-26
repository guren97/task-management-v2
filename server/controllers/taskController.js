import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";
import Tasks from "../models/TaskSchema.js";
import User from "../models/UserSchema.js";

// ## --------------------------------------------------------------------------------------
export const getAllTasks = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  try {
    // Find tasks associated with the provided user ID
    const tasks = await Tasks.find({ userId });

    if (!tasks) {
      // Handle the case where no tasks are found for the provided user ID
      return res.status(404).json({ success: false, error: "Tasks not found" });
    }

    // Return the found tasks along with the user's first name in the response
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ## --------------------------------------------------------------------------------------
export const setTask = asyncHandler(async (req, res, next) => {
  // Get the user ID from the authenticated user's information
  const userId = req.user._id;

  const { title, description } = req.body;

  // Check if either title or description is missing
  if (!title || !description) {
    return next(
      new ErrorResponse("Please enter both a title and description", 400)
    );
  }

  try {
    const task = await Tasks.create({ title, description, author: userId });
    res.status(201).json({
      success: true,

      task,
    });
  } catch (error) {
    return next(new ErrorResponse("Unable to create task", 500));
  }
});

// ## --------------------------------------------------------------------------------------
export const updateTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const taskId = req.params.id;
  const userId = req.user._id;

  try {
    const task = await Tasks.findById(taskId);
    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Ensure that the user is the author of the task
    if (task.author.toString() !== userId.toString()) {
      return next(
        new ErrorResponse("User is not authorized to update task", 401)
      );
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      updatedTask,
    });
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
});

// ## --------------------------------------------------------------------------------------
export const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const userId = req.user._id; // GET --user id from the authenticated user object

  try {
    const task = await Tasks.findByIdAndDelete(taskId);
    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Ensure that the user is the author of the task
    if (task.author.toString() !== userId.toString()) {
      return next(
        new ErrorResponse("User is not authorized to delete task", 401)
      );
    }
    res.status(200).json({
      success: true,
      task: { title: task.title, status: "Task deleted successfully" },
    });
  } catch (error) {
    return next(new ErrorResponse("Server Error", 500));
  }
});
