const express = require("express");
const { User } = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const {
  validatePasswordChangeData,
  validateProfileEditData,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

const router = express.Router();

// Profile View API
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Profile Edit API
router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Password Change API
router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePasswordChangeData(req);

    const { currentPassword, newPassword } = req.body;
    const loggedInUser = await User.findById(req.user._id).select("+password");
    if (!loggedInUser) {
      throw new Error("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      loggedInUser.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    loggedInUser.password = await bcrypt.hash(newPassword, 10);
    await loggedInUser.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = router;
