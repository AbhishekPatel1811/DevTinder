const express = require("express");

const app = express();

// GET /users => It checks all the app.xxx("matching route") functions
// GET /users => middleware chain => request handlers

app.use("/", (req, res) => {
  res.send("Handling / route");
});

app.get(
  "/user",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    res.send("2nd Route handler");
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
