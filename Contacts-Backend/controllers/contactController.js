const asyncHandler=require("express-async-handler");
const { Contact } = require("../db");
//express-async-handlers rescues us from writing the try catch blocks and passes any 
//error to the error handlr automtically

//controllers contain all our logic for request response
//whenever we create api methods we need to give labels for that-

//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContacts=asyncHandler(async (req,res)=>{
    const allContacts=await Contact.find({});
    res.status(200).json({
        msg:"Here are all the contacts",
        contacts:allContacts
    })
})

//@desc Create New Contact
//@route POST /api/contacts
//@access publi
const postContact=asyncHandler(async (req,res)=>{
    //if we want to use errorHandler instead of zod-
    // if(!req.body.name || !req.body.contact){
    //     res.status(400);
    //     throw new Error("all input fields are mandatory");
    // }
    await Contact.create({
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email
    })
    res.status(211).json({
        msg:"Contact added successfully!"
    })
})

//@desc get contact
//@route GET /api/contacts/:id
//@access public
const getContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    const contact=await Contact.findById(id)
    res.json({
        msg:contact
    })
})

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const putContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    const update = {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email
    };
    await Contact.findByIdAndUpdate(id,update);
    res.json({
        msg:"Contact updated!"
    })
})

//@desc delte contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    await Contact.deleteOne({_id:id})
    res.json({
        msg:"Contact Deleted!"
    })
})

module.exports={
    getContacts,
    postContact,
    getContact,
    putContact,
    deleteContact
}

