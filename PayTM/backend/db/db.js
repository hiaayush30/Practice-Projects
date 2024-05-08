const mongoose=require("mongoose");
const { number } = require("zod");

mongoose.connect("mongodb+srv://hiaayush30:8GDZcIu0HiRnVlV4@cluster0.sptfteu.mongodb.net/PayTM")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    } 
});

const accountsSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    },
    balance:{type:Number,required:true}

// In the real world, you shouldn’t store `floats` for balances in the database.
// You usually store an integer which represents the INR value with 
// decimal places (for eg, if someone has 33.33 rs in their account, 
// you store 3333 in the database).


// There is a certain precision that you need to support (which for india is
// 2/4 decimal places) and this allows you to get rid of precision
// errors by storing integers in your DB
})

const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",accountsSchema);

module.exports=({
    User,
    Account
})