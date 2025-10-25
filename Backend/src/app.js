const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

// for parsing incoming requests with json payloads
app.use(express.json());

// for reading cookies
app.use(cookieParser());

// Signup API
app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password Hash: " + passwordHash);

    // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added successfully!");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Validation
    validateLoginData(req);

    // find the user
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // compare the password
    const isPasswordValid = bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // create a JWT token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$369");

      // Add the token to cookie and send the response back to the server
      res.cookie("token", token);
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }

    // validate the token
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$369");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
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

// Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Update a user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Invalid updates: " + error.message);
    }

    if (data?.skills.length > 10) {
      throw new Error("Maximum 10 skills allowed");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.status(400).send("Updated Failed: " + error.message);
  }
});

// Update a user with emailId
app.patch("/userByEmailId", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try {
    console.log(req.body);
    const updatedUser = await User.findOneAndUpdate({ emailId: emailId }, data);
    if (!updatedUser) {
      return res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send("Something went wrong: " + error.message);
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
