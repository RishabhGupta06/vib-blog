
const http = require("http");

const posts = [
    { id: 1, title: "Learn JavaScript", author: "Asha" },
    { id: 2, title: "Learn Node.js", author: "Rahul" }
];

const server = http.createServer((req, res) => {
    if (req.url === "/posts" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(posts));
    } else if (req.url === "/posts" && req.method === "POST") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        
        req.on("end", () => {
            try {
                const newPost = JSON.parse(body);

                if (typeof newPost.title !== "string" || !newPost.title.trim()) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "A title is required" }));
                    return;
                }

                const post = {
                    id: posts.length + 1,
                    title: newPost.title.trim(),
                    author: typeof newPost.author === "string" && newPost.author.trim()
                        ? newPost.author.trim()
                        : "Anonymous"
                };

                posts.push(post);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(post));
            } catch {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
