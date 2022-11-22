const { required } = require("joi");
const mongoose = require("mongoose");
var reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  info: {
    type: Object,
  },

  reason: {
    type: String,
  },
  reportDate: {
    type: String,
    required: true,
  },
  reportType: {
    type: String,
  },
});
mongoose.model("Report", reportSchema);
