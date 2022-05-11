import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },

    },
    {
        timestamps:{
            createdAt:"createdAt",
            updatedAt:"updatedAt",        }
    }
);

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password
    return obj
}

const User = mongoose.model("User",userSchema);
export default User;