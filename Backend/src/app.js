const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// Handle Auth Middleware for all GET, POST, PATCH, DELETE requests
app.use("/admin", adminAuth);
// app.use("/user", userAuth);

app.get("/admin/getAllData", (req, res) => {
  // Logic of cheking if the request is authorized

  // If there's multiple such request handlers do we do this auth checking part in each ?
  // That's where we use Middleware
  // const token = "xyz";
  // const isAdminAuthorized = token === "xyz";
  // if (isAdminAuthorized) {
  //   // Logic of fetching all data
  //   res.send("All data sent");
  // } else {
  //   res.status(401).send("Unauthorized");
  // }

  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  // Logic of cheking if the request is authorized
  res.send("Deleted a user");
});

// If there's only one route we can use auth middleware like this
app.get("/user/data", userAuth, (req, res) => {
  res.send("User data sent");
});

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
