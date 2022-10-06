const mongoose = require("mongoose");
var notificationSchema = new mongoose.Schema({
  notificationText: {
    type: String,
  },
  info: {
    type: Object,
  },
  NotificationType: {
    type: String,
  },
  seen: {
    type: Boolean,
  },
});
mongoose.model("Notification", notificationSchema);
