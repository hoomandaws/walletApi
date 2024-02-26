const express = require("express");
const expensesData = require("./controler/expenses");
const authorized = require("../../middlerwares/auth");
const expensesRouter = express.Router();
expensesRouter.use(authorized);

expensesRouter.post("/less", expensesData);

module.exports = expensesRouter;
