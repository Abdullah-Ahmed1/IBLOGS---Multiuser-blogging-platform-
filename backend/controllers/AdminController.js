const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
const sendEmail = require("../utils/sendEmail");
const Blog = Mongoose.model("Blog");
const Post = Mongoose.model("Post");
const Admin = Mongoose.model("Admin");
const Notification = Mongoose.model("Notification");
const Reply = Mongoose.model("Reply");
const SavedList = Mongoose.model("SavedList");
const User = Mongoose.model("User");
const Comment = Mongoose.model("Comment");

module.exports = {
  // addAdmin: (req, res) => {
  //   Admin.create(req.body).then((admin) => {
  //     console.log(admin);
  //   });
  // },

  adminLogin: async (req, res) => {
    console.log(req.body);

    const admin = await Admin.findOne({ username: req.body.username });
    console.log("---------------------", admin);
    if (!admin)
      return res.json({
        status: "error",
        msg: "invalid username or password",
      });

    // const validPassword = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );
    const validPassword = () => {
      return req.body.password === admin.password ? true : false;
    };
    console.log(validPassword());
    if (!validPassword())
      return res.json({
        status: "error",
        msg: "invalid username or password",
      });
    const token = jwt.sign(
      { username: admin.username, password: admin.password, id: admin._id },
      "1122334455"
    );
    return res.json({ status: "ok", data: token });
  },

  //------------------------------------------------------------------------------------------
  getAllUsers: (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      User.find({})
        .then((data) => {
          res.send({ data });
        })
        .catch((err) => {
          re.send(err);
        });
    } catch (err) {
      res.send(err);
    }
  },

  //---------------------------------------------------------------------------------------------------
  deleteUser: async (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      const userId = req.params.userId;
      console.log("///////////////////*/", userId);

      //const replies = [];

      let posts = [];
      let comments = [];
      Blog.find({ owner: userId }).then(async (blogs) => {
        //console.log("-----", blogs);
        //console.log("!!!!!", blogs.length);

        await Promise.all(
          blogs.map((blog) => {
            blog.posts.map(async (post) => {
              posts.push(post);
              await SavedList.updateOne({}, { $pull: { savedPosts: post } });
              await User.updateOne({}, { $pull: { ReadingList: post } });
              await Post.findByIdAndDelete({ _id: post });
            });
          })
        );

        await Promise.all(
          posts.map(async (post) => {
            await Post.findById({ _id: post }).then(async (post) => {
              // console.log(post.comments);
              if (post) {
                comments.push(...post.comments);
              }
              //console.log(post);
              //pops all the posts from savedlists  created by that user

              // console.log(comments);
            });
          })
        );

        //delete all the replies that are created by that user
        await Reply.deleteMany({ author: userId });

        //deletes all lists created y that user
        await SavedList.deleteMany({ listOwner: userId });

        //delete all the comments that are created by that user
        await Comment.deleteMany({ author: userId });
        //delete all comments of posts created by user +
        //delete all replies of comments of post created by user
        await Promise.all(
          comments.map(async (comment) => {
            await Comment.deleteMany({ _id: comment });
            await Reply.deleteMany({ parentComment: comment });
          })
        );
        await Blog.deleteMany({ owner: userId });
        await User.findByIdAndDelete({ _id: userId });

        console.log("posts :", posts);
        console.log("comments:", comments);

        res.send({ msg: "User is Deleted" });
      });
    } catch (err) {
      res.send(err);
    }
  },
  //--------------------------------------------------------------------------------------------------

  deleteBlog: async (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      const blogId = req.params.blogId;
      const userId = req.body.userId;
      console.log("blogId : ", blogId);
      console.log("userId: ", userId);
      let posts = [];
      let comments = [];
      try {
        const data = await Blog.findById({ _id: blogId }, { posts: 1, _id: 0 });
        // console.log("data", data[0].posts);

        posts.push(...data.posts);
        console.log(posts);

        await Promise.all(
          posts.map(async (item) => {
            await SavedList.updateOne({}, { $pull: { savedPosts: item } });
            await User.updateOne({}, { $pull: { ReadingList: item } });
            await Post.deleteOne({ _id: item });
          })
        );

        await Promise.all(
          posts.map(async (post) => {
            await Post.findById({ _id: post }).then(async (post) => {
              if (post) {
                comments.push(...post.comments);
              }
            });
          })
        );

        await Promise.all(
          comments.map(async (comment) => {
            await Comment.deleteMany({ _id: comment });
            await Reply.deleteMany({ parentComment: comment });
          })
        );

        //-------------------------Deleting that blog from blogs collection--------------------------------------------------
        await Blog.deleteOne({ _id: blogId });

        //------------- Remove blogId from your_blogs array of user ---------
        await User.updateOne(
          { _id: userId },
          { $pull: { your_blogs: blogId } }
        );

        res.send({ msg: "deleted successfully" });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      res.send(err);
    }
  },

  deletePost: async (req, res) => {
    const postId = req.params.postId;
    console.log(postId);
    const comments = [];
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      const post = await Post.findOne({ _id: postId });
      await SavedList.updateOne({}, { $pull: { savedPosts: postId } });
      await User.updateOne({}, { $pull: { ReadingList: postId } });
      await Blog.updateOne(
        { _id: post.parentBlog },
        { $pull: { posts: postId } }
      );
      Post.findOne({ _id: postId }).then(async (post) => {
        if (post) {
          comments.push(...post.comments);
        }

        await Promise.all(
          comments.map(async (comment) => {
            await Comment.deleteMany({ _id: comment });
            await Reply.deleteMany({ parentComment: comment });
          })
        );
        await Post.findByIdAndDelete({ _id: postId });

        res.send("Post Deleted Successfully");
      });
    } catch (err) {
      res.send(err);
    }
  },
  //------------------------------------------------------------------------------------------------------------------
  getAllBlogsOfUser: (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      const userId = req.params.userId;

      Blog.find({ owner: userId })
        .populate({
          path: "owner",
          select: {
            firstname: 1,
            lastname: 1,
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
      const decoded = jwt.verify(token, "1122334455");
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
      res.send(err);
    }
  },
  getFullPost: (req, res) => {
    console.log("Admin get fullPost reached");
    const postId = req.params.postId;
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
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
    } catch (err) {
      res.send(err);
    }
  },
  getOneUser: (req, res) => {
    console.log("----*-*----", req.params.userId);
    const userId = req.params.userId;
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      User.findOne({ _id: userId })
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
        })
        .then((user) => {
          res.send(user);
        });
    } catch (err) {
      res.send(err);
    }
  },

  getNotification: (req, res) => {
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      console.log("admin get notifiacation reached");
      Notification.find({ notificationType: "report" }).then((item) => {
        res.send(item);
      });
    } catch (err) {
      res.send(err);
    }
  },

  setNotificationSeen: (req, res) => {
    console.log("notification set seen reached");
    const notificationId = req.params.id;
    const token = req.headers["authorization"];

    try {
      const decoded = jwt.verify(token, "1122334455");

      Notification.updateOne(
        { _id: notificationId },
        {
          seen: true,
        }
      ).then((not) => {
        res.send(not);
      });
    } catch (err) {
      res.send(err);
    }
  },

  deleteNotification: (req, res) => {
    console.log("delete notification reached");
    const token = req.headers["authorization"];
    console.log(token);
    const notificationId = req.params.id;
    try {
      const decoded = jwt.verify(token, "1122334455");
      Notification.deleteOne({ _id: notificationId }).then((notifi) => {
        res.send(notifi);
      });
    } catch (err) {
      res.send(err);
    }
  },

  addWarningNotification: (req, res) => {
    console.log("reached", req.params.id);
    const notificationId = req.params.id;
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      Notification.findById({ _id: notificationId }).then((notification) => {
        // console.log(notification);
        const data = {
          notificationText: "",
          info: {
            ownerId: notification.info.ownerId,
            postId: notification.info.postId,
            postTitle: notification.info.postTitle,
            reason: notification.info.reason,
          },
          notificationType: "warning",
          seen: "false",
          notificationDate: new Date(),
        };
        // console.log(data);

        Notification.create(data)
          .then((item) => {
            console.log("-*-*-*-*-*-", item);
            res.send("User is warned");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (err) {
      res.send(err);
    }
  },

  getPostOfBlog: (req, res) => {
    const blogId = req.params.blogId;
    const token = req.headers["authorization"];
    console.log(token);
    try {
      const decoded = jwt.verify(token, "1122334455");
      Post.find({ parentBlog: blogId })
        .then((posts) => {
          res.send(posts);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (err) {
      //  console.log(err);
      res.send(err);
    }
  },

  sendEmail: async (req, res) => {
    console.log("send email reached");
    const token = req.headers["authorization"];
    try {
      const decoded = jwt.verify(token, "1122334455");
      await sendEmail(req.body.email, req.body.subject, req.body.body);

      res.send("email end successfully");
    } catch (err) {
      console.log(err);
    }
  },

  // getUserFollowers : (req,res)=>{
  //   const userId = req.params.userId

  //   User.findOne({ _id: userId }).then((user) => {
  //     user.follower.map(user=>{

  //     })
  //   });
  // }
};
