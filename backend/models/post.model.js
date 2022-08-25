const mongoose = require("mongoose");
var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  date: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },

  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  dislikes: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  comments: {
    type: [{}],
  },

  Categories: {
    type: [String],
  },
});
mongoose.model("Post", postSchema);
