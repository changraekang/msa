const db = require("../db.js");
const { createClient } = require("redis");

let client; // 전역 변수로 설정

async function run() {
  client = createClient({ url: "redis://localhost", port: 6379 });

  client.on("error", (err) => console.log("Redis Client Error", err));

  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Could not connect to Redis:", err);
  }
}

run();

const getTest = async (req, res) => {
  const q = "SELECT * FROM test";

  try {
    const [data] = await db.query(q);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTestRedis = async (req, res) => {
  const redisKey = "db:test"; // Redis에서 사용할 키
  try {
    // 먼저 Redis에서 데이터를 조회합니다.
    const cachedData = await client.get(redisKey);
    if (cachedData) {
      console.log("Using cached data");
      return res.status(200).json(JSON.parse(cachedData));
    }
    // 캐시된 데이터가 없을 경우, DB에서 데이터를 조회합니다.
    const q = "SELECT * FROM test";
    const [data] = await db.query(q);
    // Redis에 데이터를 캐시합니다. (예: 1시간 동안 유지)
    await client.set(redisKey, JSON.stringify(data), "EX", 3600);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error while fetching data:", err);
    res.status(500).send(err);
  }
};
const insertTest = async () => {
  for (let i = 0; i < 100; i++) {
    const testnum = i.toString().padStart(4, "0");

    const query = `INSERT INTO test (name) VALUES (?)`;
    const values = ["Sample Data B - " + testnum];
    try {
      await db.execute(query, values);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
};

module.exports = { getTest, getTestRedis, insertTest };
