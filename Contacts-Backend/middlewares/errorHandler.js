const errorHandler=function(err,req,res,next){
    const statusCode=res.statusCode ? res.statusCode:500;
    res.json({msg:err.msg})
}

const zod=require("zod");

const schema1=zod.object({
    name:zod.string(),
    email:zod.string().email(),
    contact:zod.number()
})

function postMiddleware(req,res,next){
    const response=schema1.safeParse(req.body);
    !response.success ? res.status(400).json({msg:response.error.issues}):next()
}

module.exports={
    postMiddleware
}