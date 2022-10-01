const express = require("express");
const router = express.Router();
const ReaderDashController = require("../controllers/ReaderDashController");

router.route("/").get(ReaderDashController.getAllData);
router.route("/full-post/:id").get(ReaderDashController.getFullPost);
router.route("/add-comment/:postId").post(ReaderDashController.addComment);
router
  .route("/add-reply-to-comment/:commentId")
  .post(ReaderDashController.addReplyToComment);
router.route("/get-comments/:postId").get(ReaderDashController.getPostComments);
router
  .route("/get-allReplies-to-specific-comment/:commentId")
  .get(ReaderDashController.getAllRepliesToSpecificComment);
router
  .route("/add-to-reading-list/:postId")
  .post(ReaderDashController.addReadingList);

router.route("/get-reading-list").get(ReaderDashController.getReadingList);
router
  .route("/remove-for-readingList/:postId")
  .delete(ReaderDashController.removeFromReadingList);

router.route("/getUserData/:userId").get(ReaderDashController.getUserData);
router.route("/add-follower").post(ReaderDashController.addFollower);
//router.route("/all").get(ReaderDashController.getAllData1);
//router.route("/all2").get(ReaderDashController.getAllData2);

module.exports = router;
