const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");
const cors = require("cors");
router.use(cors());
/////////////////////////blog//////////////////////////////////////////////////
router.route("/add/:userId").post(BlogController.addBlog);
router.route("/get").get(BlogController.getBlog);
router.route("/deletePost/:id").delete(BlogController.deletePost);
router.route("/get/:id").get(BlogController.getOneBlog);

//////////////////////// posts ///////////////////////////////////////////////
router.route("/addpost/:blogId").post(BlogController.addPost);
router.route("/get-all-posts/:blogId").get(BlogController.getPost);

module.exports = router;
