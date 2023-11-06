const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
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
