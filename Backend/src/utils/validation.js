const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateLoginData = (req) => {
  const { emailId } = req.body;

  if (!emailId) {
    throw new Error("Email is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};

const validateProfileEditData = (req) => {
  const { age, photoUrl, skills } = req.body;

  if (age <= 18) {
    throw new Error("Your age is not valid");
  } else if (!validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
  } else if (skills.length > 10) {
    throw new Error("please add only 10 skills");
  }

  const isAllowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isAllowedFields = Object.keys(req.body).every((field) =>
    isAllowedEditFields.includes(field)
  );

  return isAllowedFields;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateProfileEditData,
};
