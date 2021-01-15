const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({

    usertype: {
        type: String,
        require:false

    },

    username: {
        type: String,
        require: false
    },

    mobile: {
        type: String,
        require: false
    },

    password: {
        type: String,
        require: false
    },

    gender: {
        type: String,
        require: false
    },

    bmdcNo: {
        type: String,
        require: false
    },

    department: {
        type: String,
        require: false
    },

    degree: {
        type: String,
        require: false
    },

    medical: {
        type: String,
        require: false
    },

    visit: {
        type: String,
        require: false
    },

    age: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('User',userSchema);