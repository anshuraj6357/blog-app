// Import mongoose
const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }],
    comment: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment",
    }],
    userid:{
        type: String, 
        ref: "User",
    },
    file:{
        type:String,
    },
});

module.exports = mongoose.model("Post", postSchema);
