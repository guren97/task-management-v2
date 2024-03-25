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
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// REMOVE extra query information from documents
TaskSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
  },
});

const Tasks = mongoose.model("Tasks", TaskSchema);

export default Tasks;
