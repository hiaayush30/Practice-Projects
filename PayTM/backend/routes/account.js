const {Router}=require("express");
const authMiddleware = require("../Middlewares/middleware");
const { Account } = require("../db/db");
const accountRoute=Router();
const zod=require("zod")

const transferSchema=zod.object({
    to:zod.string(),
    amount:zod.number()
})

accountRoute.get("/balance",authMiddleware,async(req,res,next)=>{
    const userAccount=await Account.findOne({userId:req.userId});
    res.status(200).json({
        balance:userAccount.balance
    })
})

accountRoute.post("/transfer",authMiddleware,async(req,res)=>{
    if(!transferSchema.safeParse(req.body).success){
        res.json({
            msg:"Invalid inputs!"
        })
    }
    const transferAccountId=req.body.to;
    const amount=req.body.amount
    const donor=await Account.findOne({userId:req.userId});
    const reciever=await Account.findOne({userId:transferAccountId});

    if(donor.balance<amount){
        res.status(400).json({
            msg:"Insufficient Balance!"
        })
    }
    if(!reciever){
        res.status(400).jsom({
            msg:"Invalid Account!"
        })
    }
   const newDonorBalance=donor.balance-amount;
})


module.exports=accountRoute