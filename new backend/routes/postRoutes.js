const express = require("express");
const {getPost,newPost,postById,updatePostById,deletePost} = require('../controller/postController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();



router.get("/",authMiddleware, getPost);
router.get("/:id",postById)

router.post("/",authMiddleware,newPost);

router.put("/:id",authMiddleware,updatePostById);

router.delete("/:id",authMiddleware,deletePost);


module.exports = router;