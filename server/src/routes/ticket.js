import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import Ticket from "../models/ticket.js";

const ticketRouter = Router();

ticketRouter.post("/add",isAuthenticated,async(req,res)=>{
    console.log(req.body);
    var ticketdata = {
        ticketTitle:req.body.title,
        ticketDescription:req.body.description,
        userId:req.user._id,
        userName:req.user.firstName + " " + req.user.lastName
    }
    const ticket = await Ticket.create(ticketdata)
    res.status(201).json(ticket)
    });

ticketRouter.get("/all",async(req,res)=>{
    try{
        Ticket.find({isDeleted:false},(err,tickets)=>{
            if(err){
                return(err)
            }
            return res.status(200).json({tickets})
        })
    }
    catch(err){
        return(err)
    }
});

ticketRouter.get("/:id",async(req,res)=>{
    try{
        Ticket.find({_id:req.params.id},(err,tickets)=>{
            if(err){
                return(err)
            }
            return res.status(200).json({tickets})
        })
    }
    catch(err){
        return(err)
    }
});

ticketRouter.put("/:id",(req,res)=>{
    var ticketdata = {
        ticketTitle:req.body.title,
        ticketDescription:req.body.description
    }
    try{
        Ticket.findByIdAndUpdate(req.params.id,ticketdata,(err,tickets)=>{
            if(err){
                return(err)
            }
            return res.status(200).json({tickets})
        
        })

    }
    catch(err){
        return(err)
    }
})

ticketRouter.delete("/:id",(req,res)=>{
    try{
        Ticket.findByIdAndUpdate(req.params.id,{isDeleted:true, deletedAt: new Date()},(err,tickets)=>{
            if(err){
                return(err)
            }
            return res.status(200).json({tickets})
        
        })

    }
    catch(err){
        return(err)
    }
})
export default ticketRouter;