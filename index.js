const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/incomes.routes");
const expensesRouter = require("./modules/expenses/expensive.routes");
require("./models/users.model");
require("./models/transaction.model");

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("error in Database connection", e);
  });
app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expenses", expensesRouter);
app.listen(8000, () => {
  console.log("server started");
});
