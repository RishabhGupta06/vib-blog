// const { default: mongoose } = require("mongoose");

const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    title: String,
    author: String
});


const post = mongoose.model("Post", postSchema);

module.exports = post;