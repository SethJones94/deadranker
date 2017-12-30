const express = require("express");
const passport = require("passport");
const Account = require("../models/account");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const addVideoController = require("../controllers/addVideoController");

// Home page GET
router.get("/", indexController.indexPageGET);
// Register page GET
router.get("/register", registerController.registerPageGET);
// User register
router.post("/register", registerController.userRegisterPOST);
// Login page
router.get("/login", loginController.loginPageGET);
// User login
router.post("/login", loginController.loginAuthenticate);
// Add Video Page GET
router.get("/add", addVideoController.addPageGET);
// POST new video
router.post("/add", addVideoController.createVideo);
/* Logout - To do
router.get("/logout", function(req, res) {
  res.logout();
  res.redirect("/");
});
*/

module.exports = router;
