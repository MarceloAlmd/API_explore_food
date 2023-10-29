const path = require("path");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
