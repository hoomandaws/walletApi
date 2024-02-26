const express = require("express");
const userRouter = express.Router();
const userRegister = require("./controler/userRejester");
const userLogin = require("./controler/userLogin");
const authorized = require("../../middlerwares/auth");
const userDashBoard = require("./controler/userDashBoard");
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.use(authorized);
userRouter.get("/userdashboard", userDashBoard);
module.exports = userRouter;
