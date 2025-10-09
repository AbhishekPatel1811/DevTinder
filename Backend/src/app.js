const express = require("express");

const app = express();

// /ac , /abc
/* app.get("/ab?c", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

app.get("/ab+c", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

app.get("/ab*cd", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

//Optional
app.get("/a(bc)?d", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

app.get("/a(bc)+d", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

 */

// Regex
app.get(/a/, (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

app.get(/.*fly$/, (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

// query paramters
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

// Dynamic routes params
app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Abhishek", lastName: "Patel" });
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
