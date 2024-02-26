const express = require("express");
const incomeData = require("./controler/incomes");
const authorized = require("../../middlerwares/auth");
const incomeRouter = express.Router();

incomeRouter.use(authorized);
incomeRouter.post("/add", incomeData);

module.exports = incomeRouter;
