const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");
const cors = require("cors");
router.use(cors());

router.route("/add/:userId").post(BlogController.addBlog);
router.route("/get").get(BlogController.getBlog);
router.route("/deletePost/:id").delete(BlogController.deletePost);
router.route("/get/:id").get(BlogController.getOneBlog);
module.exports = router;
