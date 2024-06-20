const express = require("express");   // this is mainRouter

const userRouter = require("./user");
const accountRouter = require("./account");
const router = express.Router();
router.use("/user",userRouter);   // ./user
router.use("/account",accountRouter);

module.exports = router;