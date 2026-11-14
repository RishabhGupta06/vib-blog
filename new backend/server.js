
const express = require("express");
const mongoose = require("mongoose");
const post = require("./modules/post");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
// const posts = [
//     { id: 1, title: "Learn JavaScript", author: "Asha" },
//     { id: 2, title: "Learn Node.js", author: "Rahul" }
// ];

app.use((req, res, next) => {
    console.log(req.method,req.url);

    next();
});

app.get("/", (req, res) => {
    res.send("My first Express server");
});

app.get("/about", (req,res) => {
    res.end("This is my blogging API");
})


// app.get("/posts", async (req, res) => {
//     try {
//         const posts = await post.find();

//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// });


// app.get("/posts/:id", async(req, res) => {
//     const id = (req.params.id);
//     try{
//         const post1 = await post.findById(id);
//         res.json(post1);
//     }
// catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// });

// app.put("/posts/:id", async(req, res) => {
//     try {
//     const id = (req.params.id);
//     const posts = await post.findById(id);

//     if (!posts) {
//         return res.status(404).json({
//             error: "Post not found"
//         });
//     }

//     if (typeof req.body.title !== "string" || !req.body.title.trim()) {
//         return res.status(400).json({
//             error: "A valid title is required"
//         });
//     }


//     posts.title = req.body.title.trim();

//     await posts.save();
//     res.json(posts);
//     }
//     catch(error){
//                 res.status(400).json({
//             error: error.message
//         });
//     }

// });

// app.post("/posts", (req, res) => {
//     const { title, author } = req.body;

//     if (typeof title !== "string" || !title.trim()) {
//         return res.status(400).json({
//             error: "A title is required"
//         });
//     }

//     const newPost = {
//         id: posts.length + 1,
//         title: title.trim(),
//         author: typeof author === "string" && author.trim()
//             ? author.trim()
//             : "Anonymous"
//     };

//     posts.push(newPost);

//     res.status(201).json(newPost);
// });



app.delete("/posts/:id", async(req, res) => {

    try{
        const id = (req.params.id);
        const index = await post.findByIdAndDelete(id);
    
        if (!index) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
    
    
        res.json({
            message: "Post deleted successfully",
            post: index
        });

    }
    catch(error){
        res.status(500).json({
            error: "Internal server error"
        });

    }
});

// app.post("/posts", async (req, res) => {
//     try {
//         const { title, author } = req.body;

//         if (typeof title !== "string" || !title.trim()) {
//             return res.status(400).json({
//                 error: "A valid title is required"
//             });
//         }

//         const newPost = await post.create({
//             title: title.trim(),
//             author: typeof author === "string" && author.trim()
//                 ? author.trim()
//                 : "Anonymous"
//         });

//         res.status(201).json(newPost);

//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// });

// app.post("/test-post", async (req, res) => {
//     try {
//         const newPost = await post.create({
//             title: "Learn MongoDB",
//             author: "Rishabh"
//         });

//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
    
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});
