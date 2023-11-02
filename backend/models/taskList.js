const { default: mongoose } = require("mongoose");

const listSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: String,
      required: true,
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

const List = mongoose.model("list", listSchema);

module.exports = List;
