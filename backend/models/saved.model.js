const { required } = require("joi");
const mongoose = require("mongoose");
var savedListSchema = new mongoose.Schema({
  listName: {
    type: String,
  },
  savedPosts: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },

  listOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  creationDate: {
    type: String,
    required: true,
  },
});
mongoose.model("SavedList", savedListSchema);
