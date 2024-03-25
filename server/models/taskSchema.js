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
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", TaskSchema);

export default Tasks;
