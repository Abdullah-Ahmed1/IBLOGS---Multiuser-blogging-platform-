const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");
const cors = require("cors");
router.use(cors());
/////////////////////////blog//////////////////////////////////////////////////
router.route("/add/:userId").post(BlogController.addBlog);
router.route("/get").get(BlogController.getBlog);
router.route("/get/:id").get(BlogController.getOneBlog);
router.route("/delete-blog/:id").delete(BlogController.deleteBlog);
//////////////////////// posts ///////////////////////////////////////////////
router.route("/addpost/:blogId").post(BlogController.addPost);
router.route("/get-all-posts/:blogId").get(BlogController.getPost);
//  router.route("/temp").get(BlogController.tempMethod);
module.exports = router;
