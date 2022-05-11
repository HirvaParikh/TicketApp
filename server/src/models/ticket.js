import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        ticketTitle:{
            type:String,
            required:true
        },
        ticketDescription:{
            type:String,
            required:true
        },
        userId:{
            type:mongoose.Types.ObjectId          
        },
        userName:{
            type:String,
            required:true,          
        },
        deletedAt:{
            type:Date,
        },
        isDeleted:{
            type:Boolean,
            default:false
        }

    },
    {
        timestamps:{
            createdAt:"createdAt",
            updatedAt:"updatedAt",        }
    }
);


const Ticket = mongoose.model("Ticket",ticketSchema);
export default Ticket;