let express = require("express");
let bodyParser = require("body-parser");
require("dotenv").config();

let app = express();
let path = require("path");

// Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

// Implement a Root-Level Request Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

app.use(logger);

// Serve an HTML File
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Serve JSON on a Specific Route
app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  });
});

// Chain Middleware to Create a Time Server
app.get(
  "/now",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    req.time = new Date().toString();
    res.json({
      time: req.time,
    });
  }
);

// Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

// Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});

module.exports = app;
