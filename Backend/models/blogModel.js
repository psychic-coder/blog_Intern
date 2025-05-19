import mongoose from "mongoose";


const blogSchema= new mongoose.Schema({
    title:{
        type:String,
    },
    content:{
        type:String,    
    },
    tags:[{
        type:String,
    }],
    status:{
        type:String,
        enum: ["draft", "published"],
        default:"draft"
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    published_at:{
        type:Date
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:Date,
        default:Date.now()
    }
})

const Blog=mongoose.model("Blog",blogSchema)
export default Blog;