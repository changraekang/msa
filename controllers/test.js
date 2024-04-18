const db = require("../db.js");

const getTest = async (req, res) => {
  const q = "SELECT * FROM test";

  try {
    const [data] = await db.query(q);
    console.log(data, "test failed");
    res.status(200).json(data);
  } catch (err) {
    console.log(err, "test failed");
    res.status(500).send(err);
  }
};

module.exports = { getTest };
