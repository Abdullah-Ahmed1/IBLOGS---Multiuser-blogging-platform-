const mongoose = require("mongoose");
var postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postDescription: {
    type: String,
    required: true,
  },

  postCardImage: {
    type: String,
  },
  postContent: {
    type: String,
    required: true,
  },
  tags: {
    type: [],
  },
  postKeywords: {
    type: [],
    required: true,
  },

  publishDate: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  publishStatus: {
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
  allowComments: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  parentBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },

  Categories: {
    type: [String],
  },
});
mongoose.model("Post", postSchema);
