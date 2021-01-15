const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    mobile: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    gender: {
        type: String,
        require: true
    },

    age: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User',userSchema);