const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  descreption: {
    type: String,
    required: true,
  },
  isComplated: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
