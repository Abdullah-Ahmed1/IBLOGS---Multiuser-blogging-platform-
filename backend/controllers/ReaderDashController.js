const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
//const Blog = Mongoose.model("Blog");
const Post = Mongoose.model("Post");
const User = Mongoose.model("User");
//const { User, validate } = require("../models/users.model");
module.exports = {
  // getAllData1: (req, res) => {
  //   // console.log("reached");
  //   const a = "62fa60a45bed9b72d6bbff64";
  //   User.find()
  //     .select("firstname lastname email")
  //     .populate({
  //       path: "your_blogs",
  //       populate: {
  //         path: "posts",
  //       },
  //     })
  //     .select()
  //     .exec()
  //     .then((data) => {
  //       itemList = [];
  //       data.map((item) => {
  //         item.your_blogs.map((blog) => {
  //           blog.posts.map((post) => {
  //             obj = {
  //               name: item.firstname,
  //               blog: blog.title,
  //               post: {
  //                 postTitle: post.postTitle,
  //                 postDescription: post.postDescription,
  //                 postContent: post.postContent,
  //               },
  //             };
  //             itemList.push(obj);
  //           });
  //         });
  //       });

  //       return res.send({ itemList });
  //     });
  // },

  getAllData: (req, res) => {
    Post.find()
      .populate({
        path: "parentBlog",
        select: { title: 1 },
        populate: {
          path: "owner",
          select: { firstname: 1, lastname: 1, profileImage: 1, email: 1 },
        },
      })
      .select({
        title: 1,
        postTitle: 1,
        postDescription: 1,
        postKeywords: 1,
        publishDate: 1,
        publishStatus: 1,
        allowComments: 1,
      })
      .exec()
      .then((data) => {
        res.send({ data });
      })
      .catch((err) => console.log(err));
  },

  getAllData2: (req, res) => {
    // console.log("reached");
    Post.find()
      .then((data) => res.send({ data }))
      .catch((err) => console.log(err));
  },
};
