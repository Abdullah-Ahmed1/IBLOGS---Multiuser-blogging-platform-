const { required } = require("joi");
const mongoose = require("mongoose");
var replySchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  replyText: {
    type: String,
    required: true,
  },
  parentComment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },

  uploadDate: {
    type: String,
    required: true,
  },
});
mongoose.model("Reply", replySchema);
