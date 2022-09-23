const express = require("express");
const router = express.Router();
const ReaderDashController = require("../controllers/ReaderDashController");

router.route("/").get(ReaderDashController.getAllData);
router.route("/full-post/:id").get(ReaderDashController.getFullPost);
router.route("/add-comment/:postId").post(ReaderDashController.addComment);
router.route("/get-comments/:postId").get(ReaderDashController.getPostComments);
//router.route("/all").get(ReaderDashController.getAllData1);
//router.route("/all2").get(ReaderDashController.getAllData2);

module.exports = router;
