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
  replies: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  uploadDate: {
    type: String,
    required: true,
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});
mongoose.model("Comment", commentSchema);
