const mongoose = require("mongoose");
var analysisSchema = new mongoose.Schema({
  postAnalysis: {
    type: [
      {
        analysisDate: {
          type: String,
        },
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        postLikes: {
          type: String,
        },
        postImpressions: {
          type: String,
        },
        commentsSemantics: {
          type: String,
        },
      },
    ],
  },
});
mongoose.model("WeeklyAnalysis", analysisSchema);
