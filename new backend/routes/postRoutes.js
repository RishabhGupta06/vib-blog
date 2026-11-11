const express = require("express");
const {getPost,newPost,postById,updatePostById,deletePost} = require('../controller/postController');
const router = express.Router();



router.get("/", getPost);
router.get("/:id",postById)

router.post("/",newPost);

router.put("/:id",updatePostById)

router.delete("/:id",deletePost)


module.exports = router;