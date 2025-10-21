const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
      trim: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 6,
      maxLength: 100,
    },
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
    about: { type: String, default: "This is a default about of the user!" },
    skills: { type: [String] },
  },
  { timestamps: true } // By default it adds createdAt and updatedAt fields to the schema
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
