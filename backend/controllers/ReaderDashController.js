const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
//const Blog = Mongoose.model("Blog");
const Post = Mongoose.model("Post");
const User = Mongoose.model("User");
//const { User, validate } = require("../models/users.model");
module.exports = {
  // getAllData1: (req, res) => {
  //   console.log("reached");
  //   const a = "62fa60a45bed9b72d6bbff64";
  //   User.find()
  //     .populate({
  //       path: "your_blogs",
  //       populate: {
  //         path: "posts",
  //       },
  //     })
  //     .select()
  //     .exec()
  //     .then((data) => {
  //       console.log(data);
  //       return res.send({ data });
  //     });
  // },
  getAllData: (req, res) => {
    console.log("reached");
    Post.find()
      .then((data) => res.send({ data }))
      .catch((err) => console.log(err));
  },
};
