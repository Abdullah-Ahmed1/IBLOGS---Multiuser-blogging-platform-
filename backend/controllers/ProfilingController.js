const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var connection = require("../Connection/connection");
//const User = Mongoose.model("User");
const { User, validate } = require("../models/users.model");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const { decode } = require("punycode");
const res = require("express/lib/response");

module.exports = {
  main: (req, res) => {
    res.send("hello world IBLOGS");
  },

  insertUser: async (req, res) => {
    try {
      const { error } = validate(req.body);
      console.log("reached");
      console.log(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      user = await new User({
        ...req.body,
        // your_blogs: [],
        password: hashPassword,
      }).save();

      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
      await sendEmail(user.email, "Verify Email", url);

      res
        .status(201)
        .send({ message: "An Email sent to your account please verify" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  forgetPassword: async (req, res) => {
    console.log("reached");
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(400).send({ message: "Email does not exist" });
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}users/${user.id}/forget/${token.token}`;
      await sendEmail(user.email, "Forget Password", url);
      res
        .status(201)
        .send({ message: "An Email sent to your account please verify" });
      await token.remove();
      // return res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  newPassword: async (req, res) => {
    console.log(req.params.id);
    console.log(req.body.password);
    try {
      const user = await User.findOne({ _id: req.params.id });
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      if (!user) return res.status(400).send({ message: "User not found" });

      await User.updateOne({ _id: user._id, password: hashPassword });

      res.status(200).send({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  verify: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send({ message: "Invalid link" });

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send({ message: "Invalid link" });

      await User.updateOne({ _id: user._id, verified: true });
      await token.remove();

      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log("---------------------", user);
    if (!user)
      return res.json({ status: "error", data: "invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);
    if (!validPassword)
      return res.json({
        status: "error",
        data: "invalid email or passwordddd",
      });
    const token = jwt.sign(
      { username: user.username, password: user.password, id: user._id },
      "1234567"
    );
    return res.json({ status: "ok", data: token });
  },

  me: (req, res) => {
    const token = req.headers["authorization"];
    // console.log(token);

    const decoded = jwt.verify(token, "1234567");
    console.log("--->>", decoded);

    return res.json({ userInfo: decoded });
    // const user = User.findOne({ password: decoded.password });
    // console.log("full user is ", user);
  },

  findUser: async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  },
};
