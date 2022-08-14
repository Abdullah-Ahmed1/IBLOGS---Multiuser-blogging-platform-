const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const Blog = Mongoose.model("Blog");
const { User, validate } = require("../models/users.model");

module.exports = {
  addBlog: async (req, res) => {
    const userId = req.params.userId;
    const user1 = await User.findOne({ _id: userId });
    console.log("***********", user1._id);
    console.log("--------------------", userId);
    Blog.create(req.body)
      .then(async (blog) => {
        console.log("Blog has been Added ", blog, blog._id);
        console.log("reached");
        await User.updateOne(
          { _id: user1._id },
          { $push: { your_blogs: blog._id } },
          function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log(success);
            }
          }
          // { returnOriginal: false }
        ).save();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.json(blog);
      })
      .catch((err) => res.json(err));
  },

  updateUser: (req, res) => {
    const userId = req.params.userId;
    const blog = req.body;
    console.log(userId, blog);
    User.updateOne(
      { _id: userId },

      { $push: { your_blogs: blog } }
    ).catch((err) => res.json(err));
  },
  update: async (blog) => {
    console.log("reached");
    const user = await User.findOneAndUpdate(
      { _id: "628bfbb6cd0f5de02bf11b79" },
      { $push: { your_blogs: blog._id } },
      { new: true },
      (error, doc) => {
        if (err) console.log(error);
        else console.log(doc);
      }
    );
  },

  getBlog: async (req, res) => {
    const blog = await Blog.find();
    if (blog.length == 0) return res.send("no blogs to show");
    res.json(blog);
  },
  getOneBlog: async (req, res) => {
    console.log("---", typeof req.params.id);
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(400).send("Class not found");
    res.json(blog);
  },
  deletePost: async (req, res) => {
    const post = await Blog.findByIdAndDelete(req.params.id);
    user;
    res.json({ deletedPost: post });
  },
};
