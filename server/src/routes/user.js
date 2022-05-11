import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userRouter = Router();

userRouter.post("/login",async(req,res)=>{
    console.log(req.body); 
    const userData = await  User.findOne({
        email : req.body.email,
    })  
    if (userData.password === req.body.password){
        const token = jwt.sign(JSON.stringify(userData.toJSON()),process.env.JWT_SECRET)
        res.status(200).json({token,userData})
    } 
    else{

        return res.status(401).json({error:"username or password is incorrect"})
    }
});

userRouter.post("/register",async(req,res)=>{
    console.log(req.body);   
    const user = await User.create(req.body);
    res.json(user);
});
export default userRouter;