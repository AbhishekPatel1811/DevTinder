const express = require("express");

const app = express();

// All the methods are handled by this route
app.use("/user", (req, res) => {
  res.send("HAHHAHAHHAH");
});

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

app.post("/user", (req, res) => {
  // Saving data from DB
  res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("Deleted user successfully!");
});

// This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
