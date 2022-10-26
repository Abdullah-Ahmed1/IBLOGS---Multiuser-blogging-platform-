const mongoose = require("mongoose");
var notificationSchema = new mongoose.Schema({
  notificationText: {
    type: String,
  },
  info: {
    type: Object,
  },
  notificationType: {
    type: String,
  },
  seen: {
    type: Boolean,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  notificationDate: {
    type: String,
  },
});
mongoose.model("Notification", notificationSchema);
