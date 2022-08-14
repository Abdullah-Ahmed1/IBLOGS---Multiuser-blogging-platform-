const mongoose = require("mongoose");
var postSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },

  Content: {
    type: String,
    required: true,
  },

  Date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  likes: {
    type: [
      {
        sid: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  dislikes: {
    type: [
      {
        sid: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },

  Categories: {
    type: [String],
  },
});
mongoose.model("Post", postSchema);
