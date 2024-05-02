const mongoose=require("mongoose");

const connectDB=mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("database connected!");
})

const contactSchema=new mongoose.Schema({
    name:String,
    contact:Number,
    email:String
})

const Contact=mongoose.model("Contact",contactSchema);

module.exports=({
    Contact
})

