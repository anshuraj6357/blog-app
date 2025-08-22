

const mongoose =require("mongoose");



const likeSchema =new mongoose.Schema(
    {
        post:{
            type:mongoose.Schema.Types.objectId,
            ref:"post",
        },
        user:{
            type:mongoose.Schema.Types.objectId,
            ref:"User",
            required:true,
        },
    });
module.exports =mongoose.model("like",likeSchema);