const mongoose = require("mongoose");
var eventsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
mongoose.model("Event", eventsSchema);
