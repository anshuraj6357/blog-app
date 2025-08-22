const express = require("express");
const router = express.Router();
const { Likecontroler } = require("../controllers/likeController");
const{ createComment  } = require("../controllers/commentController");
const{  CreatePost, DeletePost, GetuserPost  } = require("../controllers/postController");
const { login, signup } = require("../controllers/Auth");
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/multer");



router.post("/login", login);

 router.post("/register", signup);

 router.post("/comment",auth, createComment);

 router.post("/likes",auth,Likecontroler);

  router.post("/createpost",auth,upload.single('name'),CreatePost)
 
 router.post("/deletepost",auth,DeletePost)

 router.get("/getallpost",auth,GetuserPost)

module.exports = router;





