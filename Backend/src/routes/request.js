const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/sendConnectionReq", userAuth, async (req, res) => {
  const user = req.user;

  // Sending a connection request
  console.log("Sending a connection request");

  res.send(user.firstName + " sent the connection request");
});

module.exports = router;
