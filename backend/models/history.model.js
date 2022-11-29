const mongoose = require("mongoose");
var historySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  posts: {
    type: [],
  },
});
mongoose.model("History", historySchema);
