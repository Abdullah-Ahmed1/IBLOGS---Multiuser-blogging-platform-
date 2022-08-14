const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  dob: {
    type: String,
  },
  country: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  photo: {
    type: String,
  },
  your_blogs: {
    type: [
      {
        bid: {
          type: mongoose.Types.ObjectId,
          ref: "Blog",
        },
      },
    ],
  },
  recommended: {
    type: [
      {
        bid: {
          type: mongoose.Types.ObjectId,
          ref: "Blog",
        },
      },
    ],
  },
  saved_lists: {
    type: [
      {
        title: {
          type: String,
        },
        date: {
          type: String,
        },
        bid: {
          type: mongoose.Types.ObjectId,
          ref: "Blog",
        },
        pid: {
          type: mongoose.Types.ObjectId,
          ref: "Post",
        },
      },
    ],
  },
});
mongoose.model("User", userSchema);
