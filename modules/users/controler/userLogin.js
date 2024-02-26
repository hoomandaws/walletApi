// const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userLogin = async (req, res) => {
  const userModel = mongoose.model("users");
  const { email, password } = req.body;

  // validation
  try {
    if (!email) throw "Email is required";
    if (!password) throw "Email is required";
    const getuser = await userModel.findOne({
      email: email,
    });
    // console.log(getuser);
    if (!getuser) throw "This email doesnot match";
    const match = await bcrypt.compare(password, getuser.password);
    if (!match) throw "This password doesnot match";
  } catch (e) {
    res.status(400).send({
      message: e,
    });
    return;
  }

  // everything is goood
  const getuseraccessToken = await userModel.findOne({
    email: email,
  });
  const accessToken = jwt.sign(
    {
      _id: getuseraccessToken._id,
      email: getuseraccessToken.email,
      fullname: getuseraccessToken.fullname,
    },
    process.env.jwt_salt,
    { expiresIn: "90days" }
  );

  res.status(200).send({
    message: "Email and password match ",
    accessToken,
  });
};
module.exports = userLogin;
