const mongoose = require("mongoose");
const userDashBoard = async (req, res) => {
  const userModel = mongoose.model("users");
  const Transaction = mongoose.model("transaction");
  const getTransaction = await Transaction.find({ user_id: req.user._id })
    .sort("-createdAt")
    .select("amount remarks transaction_type").limit(5);
  const userData = await userModel
    .findOne({
      _id: req.user._id,
    })
    .select("balance fullname");

  res.status(200).send({
    msg: userData,
    transaction: getTransaction,
  });
};
module.exports = userDashBoard;
