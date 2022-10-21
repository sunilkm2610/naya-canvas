const mongoose = require("mongoose");
const randomColor = require("randomcolor");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  canvasUrl: {
    type: String,
  },
  color: {
    type: String,
    default: randomColor(),
  },
});
module.exports = mongoose.model("User", userSchema);
