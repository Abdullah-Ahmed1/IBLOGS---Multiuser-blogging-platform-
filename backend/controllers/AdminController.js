const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
//const Blog = Mongoose.model("Blog");
const Post = Mongoose.model("Post");
const Reply = Mongoose.model("Reply");
const User = Mongoose.model("User");
const Comment = Mongoose.model("Comment");

module.exports = {
  getAllUsers: (req, res) => {
    User.find({})
      .then((data) => {
        res.send({ data });
      })
      .catch((err) => {
        re.send(err);
      });
  },
  deleteUser: (req, res) => {
    const userId = req.params.userId;
    User.findById({ _id: userId }).then((user) => {
      console.log(user);
    });
  },
};
