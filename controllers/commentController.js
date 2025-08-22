const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!text || !postId) {
      return res.status(400).json({ error: "Text and postId are required" });
    }

    const newComment = new Comment({
      text,
      postId,
      commentBy: userId,
    });
    const savedComment = await newComment.save();
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comment: savedComment._id } },
      { new: true }
    )
    return res.status(200).json({
      success: true,
      message: "Comment submitted successfully",
      updatedPost,
      comment: savedComment,
    });
  } catch (err) {
    console.error("Error details:", err);
    return res.status(500).json({
      error: "Error while creating comment",
    });
  }
};


exports.Deletecomment=async(req,res)=>{

  try {

    const {commentId} =req.params;

    const foundedpost =await Comment.findByIdAndDelete(commentId);

    if(!foundedpost){
      return res.status(400).json({
        success:false,
        message:'comment not founded '
      })
    }
    return res.status(200).json({
        success:true,
        message:"comment deleted successfully"
    })

    
  } catch (err) {
    console.error("Error details:", err);
    return res.status(500).json({
      error: "Error while creating comment",
    });
  }
};

