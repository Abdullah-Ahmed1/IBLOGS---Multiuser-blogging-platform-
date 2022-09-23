const { required } = require("joi");
const mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },
});
mongoose.model("Comment", commentSchema);
