const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

// Get home page
router.get("/", homeController.homeGet);

// Show create post form on GET
router.get("/newpost", homeController.newPostGet);

// Create post on POST
router.post("/newpost", homeController.newPostPost);

module.exports = router;