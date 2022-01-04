const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

// Get home page
router.get("/", homeController.homeGet);

module.exports = router;
