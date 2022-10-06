const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.route("/getAllUsers").get(AdminController.getAllUsers);
router
  .route("/getAllBlogs-ofUser/:userId")
  .get(AdminController.getAllBlogsOfUser);
router.route("/deleteUser/:userId").delete(AdminController.deleteUser);
router.route("/deleteBlog/:blogId").delete(AdminController.deleteBlog);
module.exports = router;
