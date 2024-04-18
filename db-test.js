const db = require("./db.js");

async function saveUser() {
  const insertQuery =
    "INSERT INTO users (user_id, username, password, email) VALUES (?, ?, ?, ?)";
  const values = ["test2", "test2", "Covi@2020", "test2@covision.co.kr"];

  try {
    await db.execute(insertQuery, values);
    console.log("User saved successfully.");
  } catch (error) {
    console.error("Error saving user:", error);
  }
}
const insertSampleData = async () => {
  console.log("Inserting test records");

  for (let i = 0; i < 100; i++) {
    const query = `INSERT INTO test (name) VALUES (?)`;
    const testnum = i.toString().padStart(4, "0");

    const values = ["Sample Data B - " + testnum];

    try {
      await db.execute(query, values);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  console.log("Inserting 100 records");
};

insertSampleData();
