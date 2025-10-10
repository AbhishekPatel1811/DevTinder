const express = require("express");

const app = express();

// Multiple route handlers
app.use(
  "/user",
  (req, res, next) => {
    // Route handler 1
    next();
    // res.send("Route handler response 1");
  },
  [
    (req, res, next) => {
      // Route handler 2
      // res.send("Route handler response 2");
      next();
    },
    (req, res, next) => {
      // Route handler 3
      res.send("Route handler response 3");
    },
  ]
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
