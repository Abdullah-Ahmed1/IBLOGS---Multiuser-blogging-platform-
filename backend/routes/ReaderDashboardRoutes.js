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
  .route("/remove-from-readingList/:postId")
  .delete(ReaderDashController.removeFromReadingList);

router.route("/getUserData/:userId").get(ReaderDashController.getUserData);
router.route("/add-follower/:userId").post(ReaderDashController.addFollower);
router
  .route("/remove-follower/:userId")
  .post(ReaderDashController.removeFollower);

router.route("/add-like/:postId").post(ReaderDashController.addLike);
router.route("/addNotification").post(ReaderDashController.addNotification);
router.route("/get-notification").get(ReaderDashController.getNotification);
router.route("/create-custom-list").post(ReaderDashController.CreateCustomList);
router.route("/get-customLists").get(ReaderDashController.getCustomLists);
router.route("/add-to-customList").post(ReaderDashController.addToCustomList);
router
  .route("/get-customList-post/:listId")
  .get(ReaderDashController.getCustomListPost);
router
  .route("/remove-from-customList")
  .post(ReaderDashController.removeFromCustomList);
router.route("/get-analysis").get(ReaderDashController.getWeeklyAnalysis);
router
  .route("/get-reader-notifications")
  .get(ReaderDashController.getReaderNotifications);

router.route("/search/:data").get(ReaderDashController.search);
//router.route("/all").get(ReaderDashController.getAllData1);
//router.route("/all2").get(ReaderDashController.getAllData2);

module.exports = router;
