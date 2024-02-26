const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "Email Aleardy Used"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is Required"],
    },
    address: {
      type: String,
      // required: [true, "Password is Required"],
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userschema);
module.exports = userModel;
