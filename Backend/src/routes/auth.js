const express = require("express");
const { User } = require("../models/user");
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

const router = express.Router();

// Signup API
router.post("/signup", async (req, res) => {
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

// Login API
router.post("/login", async (req, res) => {
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
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the server
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be expired in 8hrs
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Logout API
router.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logged out successfully!!!");
});

module.exports = router;
