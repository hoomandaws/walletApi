const mongoose = require("mongoose");
const incomeData = async (req, res) => {
  const userModel = mongoose.model("users");
  const Transaction = mongoose.model("transaction");

  //   console.log(req.user.balance);
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
      transaction_type: "income",
    });
    await userModel.updateOne(
      { _id: req.user._id },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        runValidator: true,
      }
    );

    // create transaction db
  } catch (e) {
    res.status(400).send({
      message: e,
    });
    return;
  }

  res.status(200).send({
    message: "This is income field",
  });
};
module.exports = incomeData;
