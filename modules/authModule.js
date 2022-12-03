const jwt =require("jsonwebtoken")

exports.authenticateUser=(req,res,next)=>{
   if(!req.headers.accesstoken)
    return res.status(400).send({msg:"Token not found"});
try{
  const user = jwt.verify(req.headers.accesstoken,process.env.SECRET_KEY);
console.log(user);
req.body.currentuser=user;
next();
}catch(err){
    console.error(err)
    res.status(400).send({msg:"Unautherorised"})
}
   
}

///autherisation

// exports.authorizeUser=(req,res,next)=>{
//     //admin
//     if(req.body.currentuser.role === "admin")
//     next()
//     else return res.status(404).send({msg:"Forbidden"})
// };