
const express = require("express");

const app = express();

app.use(express.json());

const posts = [
    { id: 1, title: "Learn JavaScript", author: "Asha" },
    { id: 2, title: "Learn Node.js", author: "Rahul" }
];

app.get("/", (req, res) => {
    res.send("My first Express server");
});

app.get("/posts", (req, res) => {
    res.json(posts);
});
app.get("/about", (req,res) => {
    res.end("This is my blogging API");
})


app.get("/posts/:id", (req, res) => {
    const id = Number(req.params.id);

    const post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    res.json(post);
});

app.put("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    if (typeof req.body.title !== "string" || !req.body.title.trim()) {
        return res.status(400).json({
            error: "A valid title is required"
        });
    }

    post.title = req.body.title.trim();

    res.json(post);
});

app.post("/posts", (req, res) => {
    const { title, author } = req.body;

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            error: "A title is required"
        });
    }

    const newPost = {
        id: posts.length + 1,
        title: title.trim(),
        author: typeof author === "string" && author.trim()
            ? author.trim()
            : "Anonymous"
    };

    posts.push(newPost);

    res.status(201).json(newPost);
});



app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex(post => post.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    const deletedPost = posts.splice(index, 1)[0];

    res.json({
        message: "Post deleted successfully",
        post: deletedPost
    });
});
    

app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});
