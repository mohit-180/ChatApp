const {model,Schema} = require('mongoose');

const registerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select : false, 
        minlength: 6
    },
    image: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = model('user', registerSchema); 