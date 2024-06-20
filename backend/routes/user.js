const express = require("express");
const bcrypt = require('bcrypt');
const zod = require("zod");
const {User} = require("../db");
const {Account} = require("../db");
const {JWT_SECRET} = require("../config");
//const JWT_SECRET = require("../config");
const {authMiddleware} = require("../middleware")
const jwt = require("jsonwebtoken");
const router = express.Router();

// first we will create schema using zod 
const signupSchema = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string()
});

// Post route for SignUp  check if user exists , otherwise create a new user in database
router.post("/signup",async (req,res) => {
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: " Incorrect Inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    });

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/ Incorrect Inputs"
        })
    }
   
    // Function for hashing password
    async function hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }
    const hashedPassword = await hashPassword(req.body.password);

    const user = await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:hashedPassword       // store hashed password in database not original password
    })
    const userID = user._id;           // a unique id is created in database by default,so we want access of that above created user
    await Account.create({
        userID,
        balance: 1 + Math.random() * 10000
    })                                     
    
    const token = jwt.sign({                  // Authentication using JWT Token
        userID
    },JWT_SECRET);
    
    res.json({
        message : "User created Successfully",
        token: token
    })
})

//Create schema using zod for Sign In
const signinBody = zod.object({
    username : zod.string().email(),
    password: zod.string()
})

// Create a POST route for SignIn 
router.post("/signin",async (req,res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: " Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userID : user._id,       
        },JWT_SECRET)
       
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    });

 //Create schema using zod for updating User Data

 const updateBody = zod.object({
    password: zod.string.optional(),
    firstname: zod.string.optional(),
    lastname : zod.string.optional()
 });

 // Creating a POST route to update user details
 
 router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", authMiddleware,async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})


})
module.exports = router;