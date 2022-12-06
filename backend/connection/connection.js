const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/IBlogs",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("connected successfully with database");
    } else {
      console.log("error in connection " + err);
    }
  }
);

module.exports = mongoose.connect;
require("../models/users.model");
require("../models/blogs.model");
require("../models/post.model");
require("../models/comments.model");
require("../models/saved.model");
require("../models/email.model");
require("../models/history.model");
require("../models/events.model");
require("../models/replies.model");
require("../models/admin.model");
require("../models/report.model");
require("../models/notifications.model");
require("../models/weeklyAnalysis.model");
