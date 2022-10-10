const Mongoose = require("mongoose");
const axios = require("axios");
const schedule = require("node-schedule");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const Blog = Mongoose.model("Blog");
const Comment = Mongoose.model("Comment");
const Post = Mongoose.model("Post");
const Reply = Mongoose.model("Reply");
const { User, validate } = require("../models/users.model");
module.exports = {
  commentAnalysis: () => {
    console.log("reached-----------------------------------------------");
    Post.find({})
      .populate({
        path: "comments",
        select: {
          comment: 1,
        },
      })
      .select({
        likes: 1,
      })
      .then((posts) => {
        // console.log(post[0].comments[0]);

        posts.map((post) => {
          let arr = [];
          // console.log(post.comments);
          post.comments.map((item) => {
            //  console.log(item.comment);
            arr.push(item.comment);
            axios
              .post("http://127.0.0.1:3001/semantic", { array: arr })
              .then((res) => {
                console.log({
                  postId: post._id,
                  postLikes: post.likes.length,
                  semantics: res.data,
                });
              });
          });
          // console.log(arr);
        });

        // axios.post("/http://127.0.0.1:3001/semantic")
        // .then(res)
      });
  },
  testAnalysis: () => {
    var a = 1;
    // schedule.scheduleJob("*/2 * * * * *", () => {
    //   console.log(`called  : ${a} `);
    //   a = a + 1;
    // });
  },
};
