
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

app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});
