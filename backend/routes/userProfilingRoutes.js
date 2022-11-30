const express = require("express");
const router = express.Router();
const profilingController = require("../controllers/ProfilingController");

router.route("/hello").get(profilingController.main);

router.route("/register").post(profilingController.insertUser);
router.route("/login").post(profilingController.login);
router
  .route("/update-lastLogin-date")
  .post(profilingController.addLastLoginDate);
router.route("/me").get(profilingController.me);
router.route("/forget").post(profilingController.forgetPassword);
router.route("/findUser/:id").get(profilingController.findUser);
router.route("/:id/verify/:token/").get(profilingController.verify);
router.route("/:id/forget/:token/").post(profilingController.newPassword);
router
  .route("/updateProfileImage")
  .post(profilingController.updateProfileImage);
//-------------------------------------------------------------
router.route("/getProfile").get(profilingController.findProfile);
router.route("/updateProfile").post(profilingController.updateProfile);

router.route("/get-tags").get(profilingController.getTags);
router.route("/add-profile-info").post(profilingController.addProfileInfo);

module.exports = router;
