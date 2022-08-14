const mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  post: {
    type: String,
  },
});
mongoose.model("Blog", blogSchema);
