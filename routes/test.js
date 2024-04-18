const express = require("express");
const { getTest } = require("../controllers/test.js");

const router = express.Router();
router.post("/test", getTest);

module.exports = router;
