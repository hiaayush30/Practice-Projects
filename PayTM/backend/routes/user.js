const { Router } = require("express");
const userRoute = Router();
const zod = require("zod");
const { User, Account } = require("../db/db")
const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = require("../config");
const authMiddleware = require("../Middlewares/middleware");

const userSignupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
})

const userUpdateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

userRoute.post("/signup", async (req, res, next) => {
    if (!userSignupSchema.safeParse(req.body).success) {
        res.json({
            message: "Email already taken / Incorrect inputs"
        })
        return
    }
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
        return
    }
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    await Account.create({
        userId:user._id,
        balance:1+Math.random()*1000
    })
    
    const token = jwt.sign({ userId: user._id }, JWT_PASSWORD);
    res.status(200).json({
        message: "User created successfully",
        token: "Bearer " + token,
    })
})

userRoute.post("/signin", authMiddleware, async (req, res, next) => {
    const userExists = await User.findOne({ _id: req.userId })
    if (userExists) {
        const token = jwt.sign({ userId: req.userId }, JWT_PASSWORD);
        res.status(200).json({
            msg: "Signed in successfully!",
            token: "Bearer " + token,
        })
        return
    }
    res.status(411).json({
        message: "Error while logging in/ User not found!"
    })
})

userRoute.put("/", authMiddleware, async (req, res, next) => {
    const updateBody = userUpdateSchema.safeParse(req.body);
    if (!updateBody.success) {
        res.status(411).json({
            message: "Error while updating information"
        })
        return
    }
    await User.updateOne({ _id: req.userId }, req.body)
    res.status(200).json({
        message: "Updated successfully"
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