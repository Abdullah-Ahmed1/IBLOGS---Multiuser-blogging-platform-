const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.route("/getAllUsers").get(AdminController.getAllUsers);
router.route("/deleteUser/:userId").delete(AdminController.deleteUser);

module.exports = router;
