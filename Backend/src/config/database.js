const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteNode:rxAr6tEwnNYBBV56@namastenode.08pmfrn.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
