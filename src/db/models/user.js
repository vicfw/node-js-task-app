const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error();
      }
    },
    tolowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
