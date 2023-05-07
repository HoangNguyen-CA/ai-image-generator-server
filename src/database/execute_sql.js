const { query } = require("../services/postgres");
const fs = require("fs");
const path = require("path");

async function execute_sql(filename) {
  console.log(path.join(__dirname, "migrations", filename));
  const sql = await fs
    .readFile(path.join(__dirname, "migrations", filename))
    .toString();
  await query(sql);
  console.log("SQL COMMAND SUCCESSFUL");
}

module.exports = {
  execute_sql,
};
