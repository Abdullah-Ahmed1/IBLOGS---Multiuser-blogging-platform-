const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
//const Blog = Mongoose.model("Blog");
//const Post = Mongoose.model("Post");
const { User, validate } = require("../models/users.model");
module.exports = {
  getAllData: (req, res) => {
    console.log("reached");
    User.find().then((data) => console.log(data));
    res.send({ response: "resopc" });
  },
};
