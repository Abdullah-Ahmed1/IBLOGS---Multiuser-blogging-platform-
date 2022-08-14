const mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: [
      {
        uid: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comments: [String],
      },
    ],
  },
});
mongoose.model("Comment", commentSchema);
