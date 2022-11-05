const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const Blog = Mongoose.model("Blog");
const Comment = Mongoose.model("Comment");
const Post = Mongoose.model("Post");
const Notification = Mongoose.model("Notification");
const Reply = Mongoose.model("Reply");
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

  //////////////////////////// Blog Posts functions /////////////////////////////////////////////////////////////////

  addPost: async (req, res) => {
    const token = req.headers["authorization"];

    try {
      const decoded = jwt.verify(token, "1234567"); // Verify token

      const blogId = req.params.blogId;
      const blog = await Blog.findOne({ _id: blogId });
      // console.log("--------", blog);
      Post.create({ ...req.body, parentBlog: blogId })
        .then((post) => {
          console.log("Post has been Added ", post, post._id);
          //  console.log("reached");
          console.log("spot1");

          // const someDate = new Date("2022-09-11T00:02:00.000+5:30");
          // schedule.scheduleJob("MJob", someDate, async () => {
          //   try {
          //     console.log("called---------");
          //     await Post.updateOne(
          //       { _id: post._id },
          //       { publishStatus: "published" }
          //     );
          //   } catch (err) {
          //     console.log(err);
          //   }
          //   schedule.cancelJob("MJob");
          // });

          Blog.updateOne(
            { _id: blog._id },
            { $push: { posts: post._id } },
            async function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log(success);
                const user1 = await User.findOne({ _id: decoded.id });
                const data = {
                  notificationText: `${decoded.username} created new post "${post.postTitle}"  `,
                  info: {
                    // commentedPost: success._id,
                    name: user1.firstname + " " + user1.lastname,
                    image: user1.profileImage,
                    postTitle: post.postTitle,
                    ownerId: decoded.id,
                    postId: post._id,
                    // commentorName: decoded.username,
                  },
                  owner: post.parentBlog.owner,
                  seen: false,
                  notificationType: "post",
                  notificationDate: new Date(),
                };
                Notification.create(data).then((data) => console.log(data));
              }
            }
            // { returnOriginal: false }
          );
          res.statusCode = 200;
          // res.setHeader("Content-Type", "application/json");

          res.json(post);
          console.log("spot2");
        })
        .catch((err) => res.json(err));

      // const someDate = new Date("2022-09-10T16:25:00.000+5:30");

      // schedule.scheduleJob("MJob", someDate, () => {
      //   console.log(req.body, "---------");
      //   schedule.cancelJob("MJob");
      // });
    } catch (err) {
      res.send(err);
    }
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
  updateBlogInfo: (req, res) => {
    console.log("reaxhed");
    const data = req.body;
    const blogId = req.params.blogId;
    console.log(data);

    Blog.findByIdAndUpdate(
      { _id: blogId },
      {
        title: data.title,
        description: data.description,
      }
    ).then((data) => res.send(data));
  },
  deletePost: (req, res) => {
    const postId = req.params.postId;
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      Blog.find({
        posts: { $all: [postId] },
        // posts: { $elemMatch: postId },
      }).then((blog) => {
        console.log("---------!!", blog);
        Blog.updateOne({ _id: blog[0]._id }, { $pull: { posts: postId } })
          .then((response) => {
            console.log("updated blog", response);
            Post.deleteOne({ _id: postId }).then(async (data) => {
              await User.updateMany({}, { $pull: { ReadingList: postId } });
              res.send(data);
            });
          })

          .catch((err) => console.log(err));
      });
    } catch (err) {
      res.send(err);
    }
  },

  // deleteBlog: async(req, res) => {
  //   const blogId = req.params.id;
  //   const token = req.headers["authorization"];
  //   try {
  //     const decoded = jwt.verify(token, "1234567");
  //     // console.log("--->>", decoded);
  //     //
  //     User.updateOne(
  //       { _id: decoded.id },
  //       {$pull: { "your_blogs": blogId }}
  //     ).then((res)=>{
  //       Blog.find({_id : blogId},{posts})
  //     })
  //     // console.log("a is", a);
  //     res.send({ message: "Profile Image updated" });
  //   } catch (err) {
  //     return res.send({ err: err, message: "token may not be valid" });
  //   }
  //   console.log("$$$$$$$$$$", blogId);
  // },

  updatePost: (req, res) => {
    const postId = req.params.postId;
    console.log(req.params.postId);
    console.log(req.body.newRow.postTitle);
    Post.findOneAndUpdate(
      { _id: postId },
      {
        postTitle: req.body.newRow.postTitle,
        allowComments: req.body.newRow.allowComments,
      }
    ).then((post) => {
      console.log(post);
    });
  },

  deleteBlog: async (req, res) => {
    const blogId = req.params.id;
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567"); // Verify token

      //-------------------- find specific blog and get array of posts and delete all posts of blog using that array ---------------------------
      const data = await Blog.find({ _id: blogId }, { posts: 1, _id: 0 });
      console.log("data", data[0].posts);
      data[0].posts.forEach(async (item) => {
        await Post.deleteOne({ _id: item });
      });

      //-------------------------Deleting that blog from blogs collection--------------------------------------------------
      await Blog.deleteOne({ _id: blogId });

      //------------- Remove blogId from your_blogs array of user ---------
      await User.updateOne(
        { _id: decoded.id },
        { $pull: { your_blogs: blogId } }
      );
    } catch (err) {
      console.log(err);
    }
  },

  // --this is a method below to add any field to already added document

  tempMethod: async (req, res) => {
    try {
      console.log("reached-----------");
      // const a = new Date();
      await Notification.updateMany(
        {},
        { $set: { dateCreated: "" } },
        { upsert: false, multi: true }
      );
    } catch (err) {
      console.log(err);
    }
  },
  // tempMethod1: async (req, res) => {
  //   try {
  //     console.log("reached-----------");
  //     // const a = new Date();
  //     await User.updateMany({}, { lastLogin: "" });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
