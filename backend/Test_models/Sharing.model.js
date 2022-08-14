const mongoose = require("mongoose");
var sharingSchema = new mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },

  blog: {
    type: mongoose.Types.ObjectId,
    ref: "Blog",
  },

  shares: {
    type: [
      {
        uid: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        platforms: [String],
      },
    ],
  },
});
mongoose.model("Sharing", sharingSchema);
