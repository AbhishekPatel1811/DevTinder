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

  if (!isAllowedFields) {
    return false;
  }

  if (age !== undefined && age <= 18) {
    throw new Error("Your age is not valid");
  } else if (photoUrl !== undefined && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
  } else if (skills !== undefined && (!Array.isArray(skills) || skills.length > 10)) {
    throw new Error("please add only 10 skills");
  }

  return true;
};

const validatePasswordChangeData = (req) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new Error("Current password and new password are required");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("New password is not strong enough");
  }

  return true;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateProfileEditData,
  validatePasswordChangeData,
};
