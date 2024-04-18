const express = require("express");
const { getTest } = require("../controllers/test.js");

const router = express.Router();
router.get("/", getTest);

module.exports = router;
