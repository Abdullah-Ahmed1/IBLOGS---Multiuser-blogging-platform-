const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const sendEmail = require("../utils/sendEmail");
const { post } = require("../routes/userProfilingRoutes");
const Blog = Mongoose.model("Blog");
const Post = Mongoose.model("Post");
const Reply = Mongoose.model("Reply");
const Report = Mongoose.model("Report");
const History = Mongoose.model("History");
const SavedList = Mongoose.model("SavedList");
const User = Mongoose.model("User");
const Notification = Mongoose.model("Notification");
const Comment = Mongoose.model("Comment");
const WeeklyAnalysis = Mongoose.model("WeeklyAnalysis");

const unirest = require("unirest");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
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
              (item) =>
                item.parentBlog.owner._id.toString() !== decoded.id &&
                item.publishStatus === "published"
            )
          );
        })
        .catch((err) => console.log(err));
    } catch (err) {
      res.send(err);
    }
  },
  getAllDataOfBlog: (req, res) => {
    const token = req.headers["authorization"];
    const blogId = req.params.blogId;
    try {
      const decoded = jwt.verify(token, "1234567");
      Post.find({ parentBlog: blogId })
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
              (item) =>
                item.parentBlog.owner._id.toString() !== decoded.id &&
                item.publishStatus === "published"
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

  getUserData1: (req, res) => {
    //needed for comparing followers for follow button
    const token = req.headers["authorization"];
    const userId = req.params.userId;
    console.log("+++++++++++", userId);
    try {
      const decoded = jwt.verify(token, "1234567");
      User.findOne({ _id: userId }).then((user) => {
        res.send(user);
      });
    } catch (err) {
      res.send(err);
    }
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
        .populate({
          path: "followers",
          select: {
            firstname: 1,
            lastname: 1,
            profileImage: 1,
          },
        })
        .populate({
          path: "following",
          select: {
            firstname: 1,
            lastname: 1,
            profileImage: 1,
          },
        })
        .then((response) => {
          console.log(response.followers.length);
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
      await User.findByIdAndUpdate(
        { _id: decoded.id },
        {
          $push: { following: userId },
        },
        function (error, success1) {
          if (error) {
            console.log(error);
          } else {
            User.updateOne(
              { _id: userId },
              { $push: { followers: decoded.id } },
              { upsert: true },
              async function (error, success2) {
                if (error) {
                  console.log(error);
                } else {
                  console.log(success2);

                  const data = await User.findOne({ _id: userId });
                  const NotificationData = {
                    notificationText: `${
                      success1.firstname + " " + success1.lastname
                    } started following ${
                      data.firstname + " " + data.lastname
                    }`,
                    info: {
                      followerId: decoded.id,
                      followerName:
                        success1.firstname + " " + success1.lastname,
                      followerImage: success1.profileImage,
                      followedId: userId,
                      followedName: data.firstname + " " + data.lastname,
                      ownerId: userId,
                    },
                    notificationType: "follow",
                    seen: "false",
                    notificationDate: new Date(),
                  };

                  Notification.create(NotificationData).then((data) => {
                    // res.send("Followed successfully");
                    console.log(data);
                  });
                }
              }
            );
          }
        }
      );
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
    console.log("get Notification reached");
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

  getBlogPosts: (req, res) => {
    console.log("get blog posts reached");
    const token = req.headers["authorization"];
    const blogId = req.params.blogId;
    console.log(blogId);

    try {
      const decoded = jwt.verify(token, "1234567");
      Blog.findById(blogId)
        .populate("posts")
        .populate({
          path: "owner",
          select: {
            firstname: 1,
            lastname: 1,
            profileImage: 1,
          },
        })
        .exec()
        .then((data) => {
          res.json(data);
        });
    } catch (err) {
      res.send(err);
    }
  },

  getCustomListPost: (req, res) => {
    const listId = req.params.listId;
    console.log("reached");
    SavedList.findById({ _id: listId })
      .populate({
        path: "savedPosts",
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

      .then((list) => {
        console.log(list);
        res.send(list);
      });
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
  RemoveCustomList: (req, res) => {
    const listId = req.params.listId;
    console.log("listId", listId);
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      User.updateOne(
        { _id: decoded.id },
        {
          $pull: { your_lists: listId },
        }
      ).then((user) => {
        SavedList.findByIdAndDelete({ _id: listId }).then((list) => {
          res.send("list deleted successfully");
        });
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
    console.log("remove from custom list reached");
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

  addReport: (req, res) => {
    console.log("reached--- report");
    const postId = req.body.postId;
    const ownerId = req.body.ownerId;
    const reason = req.body.reason;
    console.log(postId);
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1234567");
      const data1 = {
        reporter: decoded.id,
        info: {
          postId: postId,
          ownerId: ownerId,
        },
        reason: reason,
        reportType: "post",
        reportDate: new Date(),
      };

      Report.create(data1).then(async (item) => {
        const user = await User.findOne({ _id: decoded.id });
        const post = await Post.findOne({ _id: postId });
        const data2 = {
          notificationText: "",
          info: {
            reporter: decoded.id,
            reporterName: user.firstname + " " + user.lastname,
            reporterImage: user.profileImage,
            postId: postId,
            postTitle: post.postTitle,
            ownerId: ownerId,
            reason: reason,
          },
          notificationType: "report",
          seen: false,
          notificationDate: new Date(),
        };
        Notification.create(data2).then((data) => {
          res.send(data);
        });
        // res.send(item);
      });
    } catch (err) {
      console.log(err);
    }
  },
  addToHistory: async (req, res) => {
    console.log("add to history reached");
    const token = req.headers["authorization"];
    const postId = req.body.post;
    try {
      const decoded = jwt.verify(token, "1234567");
      const ownerId = decoded.id;
      const history = await History.findOne({ owner: decoded.id });
      console.log("1111", history);
      if (history) {
        if (!history.posts.includes(postId)) {
          History.updateOne(
            { owner: decoded.id },
            {
              $push: { posts: postId },
            }
          ).then((history) => {
            console.log(history);
          });
        }
      } else {
        console.log("reached----");
        History.create({
          owner: ownerId,
          posts: [postId],
        }).then((history) => {
          console.log(history);
        });
      }
    } catch (err) {
      res.send(err);
    }
  },

  getRecommendedPosts: async (req, res) => {
    // console.log("get recommended posts reached", req.body.postIds);
    const token = req.headers["authorization"];
    const arr = req.body.postIds;
    console.log("*-*-*-*-", arr);
    try {
      // const decoded = jwt.verify(token, "1234567");
      const posts = [];

      await Promise.all(
        arr.map(async (postId) => {
          await Post.findOne({ _id: postId })
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
              // const data = response.filter((item) => {
              //   item.parentBlog.owner._id.toString() === decoded.id;
              // });
              // console.log(data);

              //  post.push( response.filter(
              //     (item) =>
              //       item.parentBlog.owner._id.toString() !== decoded.id &&
              //       item.publishStatus === "published"
              //   ))
              // if (
              //   response.parentBlog.owner._id.toString() !== decoded.id &&
              //   item.publishStatus === "published"
              // ) {
              // console.log("*-*-*-*-*-", response);
              posts.push(response);
              // }
            });
        })
      );

      // Post.find({})
      // .then(posts=>{

      // })
      // setTimeout(() => {
      console.log("--------", posts);
      res.send(posts);
      // }, 4000);
    } catch (err) {
      res.send(err);
    }
  },
  filterWithTags: (req, res) => {
    console.log("tags filter reached");
    const tag = req.params.tag;
    console.log("the tag is", tag);
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
          tags: 1,
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
              (item) =>
                item.parentBlog.owner._id.toString() !== decoded.id &&
                item.publishStatus === "published" &&
                item.tags.includes(tag)
            )
          );
        })
        .catch((err) => console.log(err));
    } catch (err) {
      res.send(err);
    }
  },

  addView: (req, res) => {
    const postId = req.body.post;
    console.log("33333", postId);
    // Post.UpdateOne(
    //   { _id: postId },
    //   {
    //     $inc: { views: 1 },
    //   }
    // );
  },

  scrapSearch: (req, res) => {
    // console.log(req.params.title);
    const p = req.params.title;
    const link = p.replaceAll(" ", "+");
    const link1 = link + "wikipedia";
    // console.log("223322", link1);
    // console.loh()
    return unirest
      .get(`https://www.google.com/search?q=${link1}&gl=us&hl=en`)
      .headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      })
      .then(async (response) => {
        if (response.body) {
          // console.log("!!!----!!!!", response.body);
          let $ = cheerio.load(response.body);

          let titles = [];
          let links = [];
          let snippets = [];
          let displayedLinks = [];

          $(".yuRUbf > a > h3").each((i, el) => {
            titles[i] = $(el).text();
          });
          $(".yuRUbf > a").each((i, el) => {
            links[i] = $(el).attr("href");
          });
          $(".g .VwiC3b ").each((i, el) => {
            snippets[i] = $(el).text();
          });
          $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
            displayedLinks[i] = $(el).text();
          });

          const organicResults = [];

          for (let i = 0; i < titles.length; i++) {
            organicResults[i] = {
              title: titles[i],
              links: links[i],
              snippet: snippets[i],
              displayedLink: displayedLinks[i],
            };
          }
          // console.log(organicResults[0], organicResults[1]);

          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          if (organicResults[0].links) {
            await page.goto(organicResults[0].links);

            // const html = await page.content();

            const data = await page.evaluate(() => {
              return Array.from(document.querySelectorAll("p")).map(
                (x) => x.innerText
              );
            });

            // console.log(data);
            res.send(data);
          } else {
            res.send("nothing to show");
          }
        }
      });
  },

  // getFollowersOfUser: (req, res) => {
  //   console.log("reached get followers of user");
  //   const token = req.headers["authorization"];
  //   try {
  //     const decoded = jwt.verify(token, "1234567");
  //     User.find
  //   } catch (err) {
  //     res.send(err);
  //   }
  // },
};
