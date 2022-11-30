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
router.route("/delete-post/:postId").delete(BlogController.deletePost);
router.route("/get-all-posts/:blogId").get(BlogController.getPost);
router.route("/update-blog-info/:blogId").post(BlogController.updateBlogInfo);
router.route("/get-blogger-notifications").get(BlogController.getNotifications);
//------------------------------------------------- Editorial Calender APIS ----------------------------------------------------

router.route("/update-post/:postId").post(BlogController.updatePost);
router.route("/schedule").get(BlogController.startSchedule);
router.route("/stop").get(BlogController.stopSchedule);

router.route("/add-event").post(BlogController.addEvent);
router.route("/get-events").get(BlogController.getEvents);
router.route("/edit-event").post(BlogController.editEvent);
router.route("/delete-event/:eventId").delete(BlogController.deleteEvent);

router.route("/temp").get(BlogController.tempMethod);
// router.route("/temp").get(BlogController.tempMethod1);

module.exports = router;
