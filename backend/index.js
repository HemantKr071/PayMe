const express = require("express");
const cors = require("cors");
//const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index")

app.use("/api/v1",mainRouter);  // routes/index.js    mainRouter has 2 parts  
                                                //   1. userRouter   ->   /api/v1/user/
                                                //   2. accountRouter  ->  /api/v1/account/
app.listen(3000);                                                




//  /api/v1/user/signup
//  /api/v1/user/sigin
//  /api/v1/user/changepassword

//  /api/v1/account/transfermoney
//  /api/v1/account/balance