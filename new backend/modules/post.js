// const { default: mongoose } = require("mongoose");

const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true,
        default: "Anonymous"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


const post = mongoose.model("Post", postSchema);

module.exports = post;