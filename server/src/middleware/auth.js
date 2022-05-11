import jwt from 'jsonwebtoken';

export const isAuthenticated=(req,res,next)=>{

    const token = req.headers.authorization.split(" ")[1]
    if(token){
        try{
            const data= jwt.verify(token,process.env.JWT_SECRET)
            req.user= data
            next()
        }
        catch(err){
            console.log(err);
            return res.status(401).json({error:"Unauthorized User"})
        }
    }
    else{
        return res.status(401).json({error:"Unauthorized User"})
    }
};

