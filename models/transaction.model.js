const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["income", "expenses"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;
