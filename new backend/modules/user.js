const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requird: true,
        trim: true
    },

    email: {
         type: String,
        requird: true,
        trim: true
    },

    password: {
        type: String,
        requird: true
    }

});


const User = mongoose.model("User",userSchema);

module.exports = User;