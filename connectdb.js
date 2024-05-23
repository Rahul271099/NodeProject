const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "customer_db",
});
const connectdb = (host, user, password, database) => {
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("DataBase connected successfully!!!!");
  });
};

module.exports = { connectdb, db };
