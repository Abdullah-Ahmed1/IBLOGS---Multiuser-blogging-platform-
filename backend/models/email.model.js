const mongoose = require("mongoose");
var emailSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subject: {
    type: String,
  },
  content: {
    type: String,
  },
  emailDate: {
    type: String,
  },
});
mongoose.model("Email", emailSchema);
