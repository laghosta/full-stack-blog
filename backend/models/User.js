import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    avatar: String,
    },
    {
        timestamps: true
    }
    )

export default mongoose.model("User", UserScheme)