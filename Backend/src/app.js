const express = require("express");

const app = express();

// Error Handlers
app.get("/getUserData", (req, res) => {
  try {
    // Logic of DB call and get user data

    throw new Error("Something went wrong");
    res.send("User data sent");
  } catch (error) {
    res.status(500).send("Some Error Occured");
  }
});

// This is how we handle errors in express gracefully, err should be the first parameter
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
