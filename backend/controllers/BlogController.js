const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const Blog = Mongoose.model("Blog");
const Post = Mongoose.model("Post");
const { User, validate } = require("../models/users.model");
//const { Post, validate } = require("../models/post.model");
const schedule = require("node-schedule");

module.exports = {
  addBlog: async (req, res) => {
    const userId = req.params.userId;
    const user1 = await User.findOne({ _id: userId });
    console.log("***********", user1._id);
    console.log("--------------------", userId);
    Blog.create(req.body)
      .then(async (blog) => {
        console.log("Blog has been Added ", blog, blog._id);
        console.log("reached!!!!!!");
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
    console.log("reached-----");
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
    const token = req.headers["authorization"];
    //  console.log("token", token);
    try {
      const decoded = jwt.verify(token, "1234567");
      User.findById(decoded.id)
        .populate("your_blogs")
        .exec()
        .then((data) => {
          //    console.log("this user data : ", data);
          return res.send({ blogs: data.your_blogs });
        });
    } catch (err) {
      return res.send({ err });
    }
    // const blog = await Blog.find();
    // if (blog.length == 0) return res.send("no blogs to show");
    // res.json(blog);
  },
  getOneBlog: async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(400).send("Class not found");
    res.json(blog);
  },
  deletePost: async (req, res) => {
    const post = await Blog.findByIdAndDelete(req.params.id);
    user;
    res.json({ deletedPost: post });
  },

  //////////////////////////// Blog Posts functions /////////////////////////////////////////////////////////////////

  addPost: async (req, res) => {
    const blogId = req.params.blogId;
    const blog = await Blog.findOne({ _id: blogId });
    // console.log("--------", blog);
    Post.create(req.body)
      .then(async (post) => {
        console.log("Post has been Added ", post, post._id);
        //  console.log("reached");
        console.log("spot1");

        const someDate = new Date("2022-09-11T00:02:00.000+5:30");
        schedule.scheduleJob("MJob", someDate, async () => {
          try {
            console.log("called");
            await Post.updateOne(
              { _id: post._id },
              { publishStatus: "published" }
            );
          } catch (err) {
            console.log(err);
          }
          schedule.cancelJob("MJob");
        });

        await Blog.updateOne(
          { _id: blog._id },
          { $push: { posts: post._id } },
          function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log(success);
            }
          }
          // { returnOriginal: false }
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.json(post);
        console.log("spot2");
      })
      .catch((err) => res.json(err));

    // const someDate = new Date("2022-09-10T16:25:00.000+5:30");
    // schedule.scheduleJob("MJob", someDate, () => {
    //   console.log(req.body, "---------");
    //   schedule.cancelJob("MJob");
    // });
  },

  getPost: (req, res) => {
    const blogId = req.params.blogId;
    // console.log("////////////////", blogId);

    Blog.findById(blogId)
      .populate("posts")
      .exec()
      .then((data) => {
        res.json(data);
      });
  },

  //--this is a method below to add any field to already added document

  // tempMethod: async (req, res) => {
  //   try {
  //     console.log("reached-----------");
  //     await User.updateMany(
  //       {},
  //       { $set: { profileImage: "" } },
  //       { upsert: false, multi: true }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
