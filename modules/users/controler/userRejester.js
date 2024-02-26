const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userRegister = async (req, res) => {
  const userModel = mongoose.model("users");
  const { fullname, email, password, balance, address } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  let userData;
  try {
    userData = await userModel.create({
      fullname,
      email,
      password: hashPassword,
      balance,
      address,
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
    return;
  }
  res.status(200).send({
    message: "Register is Completed",
    userData,
  });
};
module.exports = userRegister;
