const Post = require("../models/postModel");
const User = require('../models/User');
const Comment = require('../models/commentModel');
const cloudinary = require('../utils/cloudinary');

exports.CreatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.id;

    let imageUrl = "";

    if (req.file && req.file.path) {
      try {
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "auto",
        });
        imageUrl = uploadedFile.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
        });
      }
    }

    const newPost = new Post({
      title,
      body,
      userid: userId,
      file: imageUrl,
    });

    await newPost.save();

    return res.status(200).json({
      success: true,
      message: `You have successfully uploaded the post.`,
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error while creating post",
    });
  }
};

exports.DeletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log(postId)
    const curruserid = req.user.id
    const searchedpost = await Post.findById(postId);
    console.log(searchedpost)

    if (!searchedpost) {
      return res.status(200).json({
        success: false,
        message: `it may be that post deleted previously ,please refresh the site`
      })
    }


    if (searchedpost.userid !== curruserid) {
      console.log('searchedpost.userid',searchedpost.userid)
      return res.status(500).json({
        success: false,
        message: `you dont have the access to that post `
      })
    }
    await Comment.deleteMany({ postId: postId });


    await Post.findByIdAndDelete(postId)
    return res.status(200).json({
      success: true,
      message: `you have deleted the post successfully `
    })

  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: "Error while deleting the post",
    });
  }
};

exports.GetuserPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const getdetails = await Post.find({ userid: userId }).populate({
      path: "like",
      select: "name"
    }).populate({
      path: "comment",
      populate: {
        path: "commentBy",
        select: "name",
      },
      select: "text",
    });
    if (!getdetails) {
      return res.status(200).json({
        success: false,
        message: `you dont have any post uploaded`
      })
    }
    return res.status(200).json({
      success: true,
      message: `this is all the  post that you  have uploadedd till now`,
      getdetails
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: `you have error`, error
    })
  }
};
