const asyncHandler=require("express-async-handler");
//express-async-handlers rescues us from writing the try catch blocks and passes any 
//error to the error handlr automtically

//controllers contain all our logic for request response
//whenever we create api methods we need to give labels for that-

//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContacts=asyncHandler(async (req,res)=>{
    res.status(200).json({
        msg:"Here are all the contacts"
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
    
    res.status(211).json({
        msg:"Contact added successfully!"
    })
})

//@desc get contact
//@route GET /api/contacts/:id
//@access public
const getContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
})

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const putContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
})

//@desc delte contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact=asyncHandler(async (req,res)=>{
    const id=req.params.id;
})

module.exports={
    getContacts,
    postContact,
    getContact,
    putContact,
    deleteContact
}

