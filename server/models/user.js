const mongoose = require('mongoose');
const { Schema } = mongoose;

let userSchema = new Schema({
    googleId: String,
    displayName: String
});

module.exports = mongoose.model('User', userSchema);