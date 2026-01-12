const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require("../models/user");

const router = express.Router();

// Like and Dislike API (send/ignore connection request)
router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    // Logged In user
    const fromUserId = req.user._id;
    const { toUserId, status } = req.params;

    // Only allow Like and Dislike as stauts
    const allowedStatus = ["like", "dislike"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status type: " + status });
    }

    // Find if the user exists in DB or not
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    // Check if there is an existing connectionRequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already exists!!!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: req.user.firstName + " " + status + "d " + toUser.firstName,
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Accepted and Rejected API
router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const { status, requestId } = req.params;

      // Only allow accepted and rejected as stauts
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      // Find the connectionRequest in db by requestId (userInput), ensuring the request approved by should be loggedIn user and the status should be like
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser,
        status: "like",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request is not found" });
      }

      // pushing the status (accepted or rejected) to the connectionRequest
      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.status(200).json({
        message: "Connection request " + status + " successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = router;
