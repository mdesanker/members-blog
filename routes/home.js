const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

// Get home page
router.get("/", homeController.homeGet);

// Show create post form on GET
router.get("/newpost", homeController.newPostGet);

// Create post on POST
router.post("/newpost", homeController.newPostPost);

// Show membership form on GET
router.get("/membership", homeController.membershipGet);

// Update membership on POST
router.post("/membership", homeController.membershipPost);

// Delete post on GET
// router.get("/deletepost/:id", homeController.postDelete);
router.get("/deletepost/:id", homeController.deletePost);

module.exports = router;
