const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
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

module.exports = userRouter;
