const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is required");
  }

  await mongoose.connect(mongoUri);
};

module.exports = { connectDB };
