const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 20 },
    lastName: { type: String, required: true, minLength: 4, maxLength: 20 },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, lowercase: true, trim: true },
    age: { type: Number, min: 18, max: 50 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: { type: String },
    bio: { type: String, default: "This is a default about of the user!" },
    skills: { type: [String] },
  },
  { timestamps: true } // By default it adds createdAt and updatedAt fields to the schema
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
