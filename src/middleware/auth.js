const jwt=require('jsonwebtoken');
module.exports=(roles=[])=>(req,res,next)=>{
 const header=req.headers.authorization||'';
 const token=header.startsWith('Bearer ')?header.slice(7):null;
 if(!token)return res.status(401).json({error:'Authentication required'});
 try{req.admin=jwt.verify(token,process.env.JWT_SECRET);if(roles.length&&!roles.includes(req.admin.role))return res.status(403).json({error:'Insufficient permissions'});next();}
 catch{return res.status(401).json({error:'Invalid or expired session'});}
};
