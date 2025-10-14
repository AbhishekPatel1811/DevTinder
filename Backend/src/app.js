const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { User } = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});

// GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  // findOne() is used to find a single user by emailId - gets me first old document
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }

  // find({emailId: userEmail}) is used to find all the users by emailId
  // try {
  //   console.log(userEmail);
  //   const users = await User.find({ emailId: userEmail });
  //   if (users.length === 0) {
  //     return res.status(404).send("User not found");
  //   } else {
  //     res.send(users);
  //   }
  // } catch (error) {
  //   res.status(500).send("Something went wrong: " + error.message);
  // }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    // find({}) is used to find all the users from database - gets me all the documents
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log(err);
    console.error("Database cannot be connected!!");
  });
