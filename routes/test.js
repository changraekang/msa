const express = require("express");
const { getTest } = require("../controllers/test.js");

const router = express.Router();
router.get("/test", getTest);

module.exports = router;
