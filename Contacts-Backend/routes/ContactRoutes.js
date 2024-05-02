const express=require("express"); 
const { getContact,postContact,getContacts,putContact,deleteContact } = require("../controllers/contactController");
const { postMiddleware } = require("../middlewares/errorHandler");
const router=express.Router();

// router.get("/",getContacts)
// router.post("/",postContact)

router.route("/").get(getContacts).post(postMiddleware,postContact);

router.get("/:id",getContact)

router.put("/:id",putContact)

router.delete("/:id",deleteContact)

module.exports=router;