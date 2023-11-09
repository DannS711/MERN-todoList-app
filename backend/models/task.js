const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required!"]
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    ListId: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
