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

  CreationDate: {
    type: String,
    required: true,
  },
});
mongoose.model("SavedList", savedListSchema);
