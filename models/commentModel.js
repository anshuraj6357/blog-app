
const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    commentBy:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post", 
        required: true,
    },
      reply: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    }],
    parentcomment: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment",
        required: true,
    }],
});

module.exports = mongoose.model("Comment", commentSchema);
