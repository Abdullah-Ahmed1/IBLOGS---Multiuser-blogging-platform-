const mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  permalink: {
    type: String,
  },

  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
  },
});
mongoose.model("Blog", blogSchema);
