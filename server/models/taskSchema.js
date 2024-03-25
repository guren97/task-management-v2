import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter task title"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
  },
  { timeStamp: true }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
