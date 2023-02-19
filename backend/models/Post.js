import mongoose from "mongoose";
const PostScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tags: {
        type:Array,
        default:[]
    },
    viewsCount:{
        type:Number,
        required:true,
        default: 0
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    imageUrl:{
        type : String,
        required : false
    },
    comments : [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text : String,
    }] ,
},
{timestamps:true})
export default mongoose.model("Post", PostScheme)