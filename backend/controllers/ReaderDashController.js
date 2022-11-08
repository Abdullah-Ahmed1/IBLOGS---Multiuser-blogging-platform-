const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
//const Blog = Mongoose.model("Blog");
const Post = Mongoose.model("Post");
const Reply = Mongoose.model("Reply");
const SavedList = Mongoose.model("SavedList");
const User = Mongoose.model("User");
const Notification = Mongoose.model("Notification");
const Comment = Mongoose.model("Comment");
const WeeklyAnalysis = Mongoose.model("WeeklyAnalysis");
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
    const token = req.headers["authorization"];

    try {
      const decoded = jwt.verify(token, "1234567");
      Post.find()
        .populate({
          path: "parentBlog",
          select: { title: 1 },
          populate: {
            path: "owner",
            select: {
              firstname: 1,
              lastname: 1,
              profileImage: 1,
              email: 1,
              ReadingList: 1,
            },
          },
        })
        .select({
          title: 1,
          postTitle: 1,
          postDescription: 1,
          postKeywords: 1,
          likes: 1,
          publishDate: 1,
          publishStatus: 1,
          allowComments: 1,
          postCardImage: 1,
        })
        .exec()
        .then((response) => {
          // console.log(
          //   response.filter(
          //     (item) => item.parentBlog.owner._id.toString() !== decoded.id
          //   )
          // );
          const data = response.filter((item) => {
            item.parentBlog.owner._id.toString() === decoded.id;
          });
          // console.log(data);
          res.send(
            response.filter(
              (item) => item.parentBlog.owner._id.toString() !== decoded.id
            )
          );
        })
        .catch((err) => console.log(err));
    } catch (err) {
      res.send(err);
    }
  },

  getAllData2: (req, res) => {
    // console.log("reached");
    Post.find()
      .then((data) => res.send({ data }))
      .catch((err) => console.log(err));
  },

  getFullPost: (req, res) => {
    console.log("ccccccccccccccccc");
    const postId = req.params.id;

    Post.find({ _id: postId })
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
        postContent: 1,
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

  addComment: (req, res) => {
    const postId = req.params.postId;
    console.log("postId", postId);
    console.log(req.body.comment);
    const token = req.headers["authorization"];

    try {
      const decoded = jwt.verify(token, "1234567");
      // console.log(decoded);
      const data = {
        author: decoded.id,
        comment: req.body.comment,
        uploadDate: new Date(),
      };
      Comment.create({ ...data, parentPost: postId })
        .then((comment) => {
          //  console.log(comment);
          Post.findOneAndUpdate(
            { _id: postId },
            { $push: { comments: comment._id } },
            function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log(success);
                Post.findOne({ _id: postId })
                  .populate({
                    path: "parentBlog",
                    select: {
                      owner: 1,
                    },
                  })
                  .then((res) => {
                    const data = {
                      notificationText: `${decoded.username} commented on "${success.postTitle}" "${comment.comment}" `,
                      info: {
                        commentedPost: success._id,
                        commentorId: decoded.id,

                        commentorName: decoded.username,
                      },
                      owner: res.parentBlog.owner,
                      seen: false,
                      notificationType: "comment",
                      notificationDate: new Date(),
                    };
                    Notification.create(data).then((data) => console.log(data));
                  });
              }
            }
          ).save();
          res.send(comment);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  },

  addReplyToComment: (req, res) => {
    const data = req.body;
    const commentId = req.params.commentId;
    const token = req.headers["authorization"];
    // console.log("data", data);
    // console.log("comment Id", commentId);
    try {
      const decoded = jwt.verify(token, "1234567");

      Reply.create({
        ...data,
        author: decoded.id,
        parentComment: commentId,
      }).then(async (reply) => {
        // console.log(reply);

        Comment.updateOne(
          { _id: commentId },
          { $push: { replies: reply._id } },
          function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log(success);
            }
          }
        );
      });
    } catch (err) {
      res.send(err);
    }
  },

  getAllRepliesToSpecificComment: (req, res) => {
    const commentId = req.params.commentId;
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      Reply.find({ parentComment: commentId })
        .populate({
          path: "author",
          select: {
            firstname: 1,
            lastname: 1,
            profileImage: 1,
          },
        })
        .then((data) => {
          res.send(data);
        });
    } catch (err) {
      res.send(err);
    }
  },

  getPostComments: (req, res) => {
    const postId = req.params.postId;
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      Post.findOne({ _id: postId })
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: {
              firstname: 1,
              lastname: 1,
              profileImage: 1,
            },
          },
        })
        .select({
          postTitle: 1,
        })
        .exec()
        .then((response) => res.send(response));
    } catch (err) {
      console.log(err);
    }
  },
  addReadingList: async (req, res) => {
    // console.log("reached", req.params.postId);
    const postId = req.params.postId;
    const token = req.headers["authorization"];
    //console.log("token", token);
    try {
      const decoded = jwt.verify(token, "1234567");
      const data = await User.update(
        { _id: decoded.id },
        { $push: { ReadingList: postId } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  getReadingList: (req, res) => {
    //console.log(" getReadingList reached");
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");

      User.find({ _id: decoded.id })
        .populate({
          path: "ReadingList",
          select: {
            postTitle: 1,
            postDescription: 1,
            postKeywords: 1,

            publishDate: 1,
          },
          populate: {
            path: "parentBlog",
            populate: {
              path: "owner",
            },
          },
        })
        .select({
          firstname: 1,
          lastname: 1,
          profileImage: 1,
          email: 1,
        })
        .then((data) => {
          console.log(data);
          res.send(data);
        });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  removeFromReadingList: async (req, res) => {
    const token = req.headers["authorization"];
    const postId = req.params.postId;
    try {
      const decoded = jwt.verify(token, "1234567");

      const data = await User.findOneAndUpdate(
        { _id: decoded.id },
        { $pull: { ReadingList: postId } }
      );
      res.send(data);
    } catch (err) {
      res.send(err);
    }
    console.log(req.params.postId);
  },

  getUserData: (req, res) => {
    const token = req.headers["authorization"];
    const userId = req.params.userId;
    console.log("+++++++++++", userId);
    try {
      const decoded = jwt.verify(token, "1234567");
      User.findOne({ _id: userId })
        .populate({
          path: "your_blogs",
          populate: {
            path: "posts",
          },
        })
        .then((response) => {
          console.log(response);
          res.send(response);
        });
    } catch (err) {
      console.log(err);
    }
  },
  addFollower: async (req, res) => {
    const token = req.headers["authorization"];
    const userId = req.params.userId;
    try {
      const decoded = jwt.verify(token, "1234567");
      console.log("-----------", userId);
      const data = await User.findByIdAndUpdate(
        { _id: decoded.id },
        {
          $push: { following: userId },
        },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            User.updateOne(
              { _id: userId },
              { $push: { followers: decoded.id } },
              { upsert: true },
              function (error, success) {
                if (error) {
                  console.log(error);
                } else {
                  console.log(success);
                }
              }
            );
          }
        }
      );

      // res.send(data);
    } catch (err) {
      res.send(err);
    }
  },

  removeFollower: (req, res) => {
    console.log("remove follower");
    const token = req.headers["authorization"];
    const userId = req.params.userId;
    try {
      const decoded = jwt.verify(token, "1234567");
      console.log("-----------", userId);
      User.findByIdAndUpdate(
        { _id: decoded.id },
        {
          $pull: { following: userId },
        },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            User.updateOne(
              { _id: userId },
              { $pull: { followers: decoded.id } },
              { upsert: true },
              function (error, success) {
                if (error) {
                  console.log(error);
                } else {
                  console.log(success);
                }
              }
            );
          }
        }
      );

      // res.send(data);
    } catch (err) {
      res.send(err);
    }
  },
  addSavedList: (req, res) => {},

  addNotification: (req, res) => {
    console.log("reached**-*-*-*");
    Notification.create(req.body).then((data) => {
      res.send(data);
    });
  },

  getReaderNotifications: (req, res) => {
    console.log("get reader notification invoked");
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      Notification.find({ notificationType: "post" }).then(
        async (notifications) => {
          let newArray = [];
          await Promise.all(
            notifications.map(async (notification) => {
              console.log("t!!!!!!!!!!!!", notification.info.ownerId);
              const user = await User.findOne({
                _id: notification.info.ownerId,
              });
              console.log("******", user);
              if (user) {
                "test---------------------",
                  user.followers.includes(decoded.id)
                    ? newArray.push(notification)
                    : null;
              }
            })
          );
          console.log("---!", newArray);
          res.send(newArray);
        }
      );
    } catch (err) {
      res.send(err);
    }
  },
  getNotification: (req, res) => {
    console.log("get Notification rreached");
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      Notification.find({
        owner: decoded.id,
      }).then((data) => {
        console.log(data);

        res.send(data);
      });
    } catch (err) {}
  },

  addLike: (req, res) => {
    const postId = req.params.postId;
    console.log(postId);
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");

      Post.findOne({ _id: postId }).then((post) => {
        post.likes.includes(decoded.id)
          ? Post.findOneAndUpdate(
              { _id: postId },
              {
                $pull: { likes: decoded.id },
              }
            ).then((data) => {
              res.send(data);
            })
          : Post.findOneAndUpdate(
              { _id: postId },
              {
                $push: { likes: decoded.id },
              }
            ).then((data) => {
              res.send(data);
            });
      });
    } catch (err) {
      res.send(err);
    }
  },
  getWeeklyAnalysis: (req, res) => {
    console.log("reached");
    WeeklyAnalysis.find({})
      .populate({
        path: "postAnalysis.postId",
        select: {
          postTitle: 1,
        },
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.send(err));
  },

  getCustomLists: (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      User.findById({ _id: decoded.id })
        .populate({
          path: "your_lists",
          select: {
            listName: 1,
            savedPosts: 1,
            creationDate: 1,
          },
        })
        .select({
          firstname: 1,
        })
        .then((user) => {
          res.send(user);
        });
    } catch (err) {
      res.send(err);
    }
  },

  CreateCustomList: (req, res) => {
    const token = req.headers["authorization"];
    console.log(req.body);
    try {
      const decoded = jwt.verify(token, "1234567");
      const data = {
        listName: req.body.listName,
        savedPosts: [],
        listOwner: decoded.id,
        creationDate: new Date().toISOString(),
      };
      SavedList.create(data).then((list) => {
        User.updateOne(
          { _id: decoded.id },
          { $push: { your_lists: list._id } }
        ).then((user) => res.send(user));
        // res.send(list);
      });
    } catch (err) {
      res.send(err);
    }
  },
  addToCustomList: (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      SavedList.findByIdAndUpdate(
        { _id: req.body.listId },
        { $push: { savedPosts: req.body.postId } }
      ).then((list) => res.send(list));
    } catch (err) {
      res.send(err);
    }
  },
  removeFromCustomList: (req, res) => {
    const data = req.body;
    // console.log(data);
    const token = req.headers["authorization"];
    try {
      SavedList.findByIdAndUpdate(
        { _id: req.body.listId },
        { $pull: { savedPosts: req.body.postId } }
      ).then((list) => res.send(list));
    } catch (err) {
      res.send(err);
    }
  },
  //----------------------------------------------------------------------

  search: (req, res) => {
    const keyword = req.params.data;
    console.log(keyword);
    const data = {};
    User.aggregate([
      {
        $addFields: {
          nameFilter: {
            $concat: ["$firstname", " ", "$lastname"],
          },
        },
      },
      {
        $match: {
          $or: [
            {
              nameFilter: {
                $regex: keyword,
                $options: "i",
              },
            },
            {
              gender: { $regex: `^${keyword}`, $options: "i" },
            },
            {
              profession: { $regex: `^${keyword}`, $options: "i" },
            },
          ],
        },
      },
    ]).exec(function (err, users) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!", users);
      // res.json(user);
      var data = { ...data, users: users };

      Post.aggregate([
        {
          $match: {
            $or: [
              {
                postTitle: { $regex: keyword, $options: "i" },
              },
              {
                postDescription: { $regex: keyword, $options: "i" },
              },
            ],
          },
        },
      ]).exec((err, posts) => {
        data = { ...data, posts: posts };
        res.send(data);
      });
    });
  },
};
