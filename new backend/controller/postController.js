const Post = require("../modules/post");

async function getPost(req, res) {
    try {
        const posts = await Post.find();

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function newPost(req, res) {
    try {
        const { title, author } = req.body;

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                error: "A valid title is required"
            });
        }

        const newPost = await Post.create({
            title: title.trim(),
            author,
            owner: req.user.id
        });

        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function postById(req, res) {
    const id = (req.params.id);
    try {
        const post1 = await Post.findById(id);
        if (!post1) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        res.json(post1);
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function updatePostById(req, res) {
    try {
        const id = (req.params.id);
        const posts = await Post.findById(id);


        if (!posts) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        if (req.user.id.toString() === posts.owner.toString()) {

            if (typeof req.body.title !== "string" || !req.body.title.trim()) {
                return res.status(400).json({
                    error: "A valid title is required"
                });
            }

            posts.title = req.body.title.trim();

            await posts.save();
            res.json(posts);
        }
        else {
            return res.status(403).json({
                error: "You are not allowed to update this post"
            });

        }
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


async function deletePost(req, res) {
    try {
        const id = req.params.id;
        const index = await Post.findById(id);

        if (!index) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (req.user && req.user.id && index.owner.toString() === req.user.id.toString()) {
            const po = await Post.findByIdAndDelete(id);
            return res.json({
                message: "Post deleted successfully",
                post: po
            });
        }

        return res.status(403).json({
            error: "You are not allowed to delete this post"
        });

    }
    catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });

    }
}

module.exports = { getPost, newPost, postById, updatePostById, deletePost };