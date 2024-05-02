//controllers contain all our logic for request response
//whenever we create api methods we need to give labels for that-

//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContacts=(req,res)=>{
    res.status(200).json({
        msg:"Here are all the contacts"
    })
}

//@desc Create New Contact
//@route POST /api/contacts
//@access publi
const postContact=(req,res)=>{
    res.status(211).json({
        msg:"Contact added successfully!"
    })
}

//@desc get contact
//@route GET /api/contacts/:id
//@access public
const getContact=(req,res)=>{
    const id=req.params.id;
}

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const putContact=(req,res)=>{
    const id=req.params.id;
}

//@desc delte contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact=(req,res)=>{
    const id=req.params.id;
}

module.exports={
    getContacts,
    postContact,
    getContact,
    putContact,
    deleteContact
}

