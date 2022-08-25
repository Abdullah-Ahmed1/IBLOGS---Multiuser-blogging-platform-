const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String },
  country: { type: String },
  mobile: { type: String },
  password: { type: String, required: true },
  your_blogs: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  // Liked_Posts: {
  //   type: [
  //     {
  //       type: mongoose.Types.ObjectId,
  //       ref: "Post",
  //     },
  //   ],
  // },
  verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),
    email: Joi.string().email().required().label("Email"),
    dob: Joi.string().label("DOB"),
    country: Joi.string().label("Country"),
    mobile: Joi.string().label("Mobile"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
