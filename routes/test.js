const express = require("express");
const { getTest, insertTest, getTestRedis } = require("../controllers/test.js");

const router = express.Router();
router.get("/", getTest);
router.get("/redis", getTestRedis);
router.get("/insert", insertTest);

module.exports = router;
