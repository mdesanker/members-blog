const express = require("express");
const router = express.Router();

const authController = require("../controllers/authContoller");

// Get sign up page
router.get("/signup", authController.signupGet);

// Post sign up page
router.post("/signup", authController.signupPost);

// Get log in page
router.get("/login", authController.loginGet);

// Post log in page
router.post("/login", authController.loginPost);

// Get log out page
router.get("/logout", authController.logoutGet);

module.exports = router;
