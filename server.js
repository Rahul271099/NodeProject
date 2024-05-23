const express = require("express");
const bodyParser = require("body-parser");
const { connectdb } = require("./connectdb.js");
const { config } = require("dotenv");
const { createCustomer } = require("./customerController.js");
const app = express();

//env configuration
config({ path: "./config.env" });

//middlewares
app.use(bodyParser.json());

//routes

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hello server");
});
app.post("/createcustomer", createCustomer);

//const db varaiables
const myHost = process.env.DB_HOST;
const myUser = process.env.DB_USER;
const mypassword = process.env.DB_PASSWORD;
const myDbName = process.env.DB_NAME;

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectdb(myHost, myUser, mypassword, myDbName);
});
