const { Router } = require("express");
const authMiddleware = require("../Middlewares/middleware");
const { Account } = require("../db/db");
const accountRoute = Router();
const zod = require("zod");
const mongoose=require("mongoose")

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})

accountRoute.get("/balance", authMiddleware, async (req, res, next) => {
    const userAccount = await Account.findOne({ userId: req.userId });
    res.status(200).json({
        balance: userAccount.balance
    })
})

accountRoute.post("/transfer", authMiddleware, async (req, res) => {
try{
    if (!transferSchema.safeParse(req.body).success) {
        res.json({
            msg: "Invalid Inputs!"
        })
        return
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const giver = await Account.findOne({ userId: req.userId }).session(session);
    if (giver.balance < amount) {
        res.status(400).json({
            msg: "Insufficient balance"
        })
        return
    }
    const reciever = await Account.findOne({ userId: to }).session(session);
    if (!reciever) {
        res.status(400).json({
            msg: "Invalid Account!"
        })
        return
    }

    await Account.updateOne({ userId: req.userId}, {
        $inc: { balance: -amount }
    }).session(session)
    await Account.updateOne({ userId: to }, {
        $inc: { balance: amount }
    }).session(session)

    res.status(200).json({
        msg: "Transaction successfull!"
    })
    session.commitTransaction();
}catch(e){
    console.log(e);
}
})


module.exports = accountRoute