const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

//router.route("/add").post(AdminController.addAdmin);
router.route("/getAllUsers").get(AdminController.getAllUsers);
router
  .route("/getAllBlogs-ofUser/:userId")
  .get(AdminController.getAllBlogsOfUser);

router.route("/login").post(AdminController.adminLogin);
router.route("/deleteUser/:userId").delete(AdminController.deleteUser);
router.route("/deleteBlog/:blogId").delete(AdminController.deleteBlog);
router.route("/deletePost/:postId").delete(AdminController.deletePost);
router.route("/get-one-user/:userId").get(AdminController.getOneUser);
router.route("/getPosts-of-blog/:blogId").get(AdminController.getPostOfBlog);
router.route("/get-fullPost/:postId").get(AdminController.getFullPost);
router.route("/get-post-comments/:postId").get(AdminController.getPostComments);
router.route("/get-notifications").get(AdminController.getNotification);
module.exports = router;
