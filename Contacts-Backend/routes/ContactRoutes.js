const express=require("express"); 
const { getContact,postContact,getContacts,putContact,deleteContact } = require("../controllers/contactController");
const { authMiddleware } = require("../middlewares/zodMiddleware");
const router=express.Router();

// router.get("/",getContacts)
// router.post("/",postContact)

router.route("/").get(getContacts).post(authMiddleware,postContact);

router.get("/:id",getContact)

router.put("/:id",authMiddleware,putContact)

router.delete("/:id",deleteContact)

module.exports=router;