const { required } = require("joi");
const mongoose = require("mongoose");
var AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
mongoose.model("Admin", AdminSchema);
