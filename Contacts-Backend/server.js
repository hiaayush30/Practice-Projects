const express=require ("express");
const app=express();
const dotenv=require("dotenv").config();
const contactRoutes=require("./routes/ContactRoutes")

app.use(express.json());
app.use("/api/contacts",contactRoutes)

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})