const mongoose = require("mongoose");
const expensesData = async (req, res) => {
  const userModel = mongoose.model("users");
  const Transaction = mongoose.model("transaction");

  const { amount, remarks } = req.body;
  try {
    if (!amount) throw "Amount is required";
    if (amount < 1) throw "Amount Must be 1";
    if (!remarks) throw "Remarks is required";
    if (remarks.length < 2) throw "Remarks must be 2 Characters  long";
  } catch (e) {
    res.status(400).send({
      message: e,
    });
    return;
  }
  try {
    await Transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "expenses",
    });
    await userModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        runValidator: true,
      }
    );
  } catch (e) {
    res.status(400).send({
      message: e,
    });
  }
  res.status(200).send({
    message: "this is expenses",
  });
};
module.exports = expensesData;
