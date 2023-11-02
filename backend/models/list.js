const { default: mongoose } = require("mongoose");

const listSchema = mongoose.Schema(
  {
    listName: {
      type: String,
      required: [true, "List name is required"],
    },
    UserId: {
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
