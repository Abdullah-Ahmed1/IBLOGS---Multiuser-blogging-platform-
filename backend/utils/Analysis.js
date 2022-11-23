const Mongoose = require("mongoose");
const axios = require("axios");
const schedule = require("node-schedule");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const Blog = Mongoose.model("Blog");
const Comment = Mongoose.model("Comment");
const Post = Mongoose.model("Post");
const Reply = Mongoose.model("Reply");
const WeeklyAnalysis = Mongoose.model("WeeklyAnalysis");
const { User, validate } = require("../models/users.model");
const { google } = require("googleapis");
const scopes = "https://www.googleapis.com/auth/analytics";
const view_id = "276275451";

require("dotenv").config();
module.exports = {
  commentAnalysis: async () => {
    let analysisArr = [];
    console.log("reached-----------------------------------------------");
    const posts = await Post.find({})
      .populate({
        path: "comments",
        select: {
          comment: 1,
        },
      })
      .select({
        likes: 1,
      });

    console.log("!!!!", posts);
    // console.log(post[0].comments[0]);

    await Promise.all(
      posts.map(async (post) => {
        let arr = [];

        // console.log(post.comments);
        post.comments.map(async (item) => {
          //  console.log(item.comment);
          arr.push(item.comment);

          // console.log("--------------------", data);
        });
        const res1 = await axios.post("http://127.0.0.1:3001/semantic", {
          array: arr,
        });
        const data = {
          analysisDate: new Date().toISOString(),
          postId: post._id,
          postImpressions: null,
          postLikes: post.likes.length,
          commentsSemantics: res1.data,
        };
        analysisArr.push(data);
        console.log("---/-", analysisArr);
        // console.log(arr);
      })
    );

    // axios.post("/http://127.0.0.1:3001/semantic")
    // .then(res)
    console.log("!!!!!!!!!3333333333333333");
    WeeklyAnalysis.create({ postAnalysis: analysisArr }).then((res) => {
      console.log(res);
    });
  },
  testAnalysis: () => {
    var a = 1;
    // schedule.scheduleJob("*/2 * * * * *", () => {
    //   console.log(`called  : ${a} `);
    //   a = a + 1;
    // });
  },

  googleAPI: () => {
    console.log("------", process.env.client_email);
    const jwt = new google.auth.JWT(
      process.env.client_email,
      null,
      process.env.private_key.replace(/\\n/g, "\n"),
      scopes
    );

    async function getViews() {
      try {
        await jwt.authorize();
        const response = await google.analytics("v3").data.ga.get({
          auth: jwt,
          ids: "ga:" + view_id,
          "start-date": "10daysAgo",
          "end-date": "today",
          dimensions: "ga:pagePath,ga:date",
          metrics: "ga:pageViews,ga:sessions",
          // dimensions: "ga:pagePath,ga:pageTitle,ga:date",
          // metrics: "ga:pageviews",
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getViews();
  },
};
