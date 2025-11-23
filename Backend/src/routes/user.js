const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName about age gender skills";

// GET all the pending connection requests for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find all pending connectionRequests
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      // }).populate("fromUserId", ["firstName", "lastName"]); // always pass the fields you want to populate
    }).populate("fromUserId", USER_SAFE_DATA);

    res
      .status(200)
      .json({ message: "Data fetched successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// GET all connections/matches (who is connected to me)
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    console.log(connections);

    const data = connections.map((c) => {
      if (c.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return c.toUserId;
      }
      return c.fromUserId;
    });

    res.json({ message: "Data fetched successfully", data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Feed API - Get all the profiles of other users on platform
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    // User should see all the user cards except
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection request

    const loggedInUser = req.user;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit; // (3 - 1) * 10 = 20, skip 20 documents from the starting

    // Find all conncetion request (sent + received)
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // Create a set of users to hide from feed (already sent or received connection request)
    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // Find all the users
    const users = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideUsersFromFeed) },
        },
        {
          _id: { $ne: loggedInUser._id },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ message: "Data fetched successfully", data: users });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
