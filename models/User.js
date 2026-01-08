// User model is required for auth
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

module.exports = mongoose.model("User", userSchema);