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
router.get("/login", authController.signupPost);

module.exports = router;
