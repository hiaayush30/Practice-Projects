const { Router } = require("express");
const userRoute = Router();
const zod = require("zod");
const { User, Account } = require("../db/db")
const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../config");
const authMiddleware = require("../Middlewares/middleware");

const userSignupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string().trim().min(1),
    lastName: zod.string().trim().min(1),
    password: zod.string().trim().min(6)
})

const userUpdateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const signInSchema=zod.object({
    username:zod.string(),
    password:zod.string()
})

userRoute.post("/signup", async (req, res) => {
    if (!userSignupSchema.safeParse(req.body).success) {
        res.status(400).json({
            msg: "Email already taken / Incorrect inputs"
        })
        return
    }
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
        res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
        return
    }
    const user = await User.create(req.body)

    await Account.create({
        userId:user._id,
        balance:1+Math.random()*1000
    })
    
    const token = jwt.sign({ userId: user._id }, JWT_PASSWORD);
    res.status(200).json({
        msg: "User created successfully",
        token: "Bearer " + token,
    })
})

userRoute.post("/signin", async (req, res, next) => {
    if(!signInSchema.safeParse(req.body)){
        res.json({
            msg:"Invalid Inputs!"
        })
    }
    const userExists = await User.findOne({username:req.body.username,password:req.body.password})
    if (userExists) {
        const userId=userExists._id
        const token = jwt.sign({ userId: userId }, JWT_PASSWORD);
        res.status(200).json({
            msg: "Signed in successfully!",
            token: "Bearer " + token,
        })
        return
    }
    res.status(411).json({
        msg: "Error while logging in/ User not found!"
    })
})

userRoute.put("/", authMiddleware, async (req, res) => {
    const updateBody = userUpdateSchema.safeParse(req.body);
    if (!updateBody.success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
        return
    }
    await User.updateOne({ _id: req.userId }, req.body)
    res.status(200).json({
        msg: "Updated successfully"
    })
})

userRoute.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""
    console.log(filter);

    // let users = await User.find({
    //     $or: [
    //         { firstName: filter },
    //         { lastName: filter }
    //     ]
    // });

    //or
    // the $regex operator is used to perform a pattern match on the firstName and
    // lastName fields of the User collection. It allows for more flexible matching,
    // as it can match substrings within the fields. For example, if filter is "John",
    // it would match users with first names or last names containing "John", like "John",
    // "Johnny", "Johnson", etc. This is useful when you want to perform partial or fuzzy
    // matching.

    let users = await User.find({
        $or: [
            { firstName: {"$regex": filter} },
            { lastName: {"$regex": filter} }
        ]
    });

    users = users.map((user) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }
    })
    res.status(200).json({
        users: users
    })
})
module.exports = userRoute;