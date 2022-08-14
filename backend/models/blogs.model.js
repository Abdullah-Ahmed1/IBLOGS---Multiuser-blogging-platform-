const mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  post: {
    type: String,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
mongoose.model("Blog", blogSchema);
