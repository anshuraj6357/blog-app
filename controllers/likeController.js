const User = require('../models/User')
const Post = require("../models/postModel")




exports.Likecontroler = async (req, res) => {
    try {
        const { postId } = req.body;
        console.log(postId);
        const userid = req.user.id;
        const findedpost = await Post.findById(postId)

        if (!findedpost) {
            return res.status(200).json({
                success: false,
                message: `unable to find that post ,it might be that user deleted that post `
            })
        }
        if (findedpost.like.includes(userid)) {
            findedpost.like.pull(userid)
            await findedpost.save()
            return res.status(200).json({
                success: true,
                message: `unliked get successfull`,
                count: findedpost.like.length
            })
        }
        findedpost.like.push(userid)
        await findedpost.save();


        return res.status(200).json({
            success: true,
            message: `liked get successfully`,
            count: findedpost.like.length
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `unable to like his post ,something wen wrong`,

        })

    }
}