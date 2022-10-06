const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const Blog = Mongoose.model("Blog");
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
  deleteBlog: async (req, res) => {
    const blogId = req.params.blogId;
    const userId = req.body.userId;
    console.log("blogId : ", blogId);
    console.log("userId: ", userId);
    try {
      const data = await Blog.find({ _id: blogId }, { posts: 1, _id: 0 });
      console.log("data", data[0].posts);
      data[0].posts.forEach(async (item) => {
        await Post.deleteOne({ _id: item });
      });

      //-------------------------Deleting that blog from blogs collection--------------------------------------------------
      await Blog.deleteOne({ _id: blogId });

      //------------- Remove blogId from your_blogs array of user ---------
      const updatedUser = await User.updateOne(
        { _id: userId },
        { $pull: { your_blogs: blogId } }
      );

      res.send(updatedUser);
    } catch (err) {
      console.log(err);
    }
  },

  getAllBlogsOfUser: (req, res) => {
    const userId = req.params.userId;

    Blog.find({ owner: userId }).then((data) => {
      res.send(data);
    });
  },
};
