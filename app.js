// library imports
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// custom imports

const dbConnection = require("./config/dbConnection");
const app = express();

dotenv.config();
// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Error: ${err}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

dbConnection();

// assigning routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", require("./auth/router"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
