const express = require("express");
const cors=require("cors");
const userRoute = require("./routes/user");
const accountRoute = require("./routes/account");
const authMiddleware = require("./Middlewares/middleware");
const app=express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRoute); 
app.use("/api/v1/account",accountRoute)

const PORT=3000;
app.listen(3000,()=>{
    console.log(`Server running on port ${PORT}`);
})

