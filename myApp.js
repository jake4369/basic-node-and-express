let express = require("express");
require("dotenv").config();
let app = express();
let path = require("path");

// Middleware
app.use("/public", express.static(__dirname + "/public"));

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  });
});

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

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

module.exports = app;
