const mongoose = require('mongoose')


const stoneSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "All fields are mandatory."],
        minLength : [2, 'The name should be at least 2 characters long.']
    },
    category : {
        type: String,
        required: [true, "All fields are mandatory."],
        minLenght: [3, 'The category should be at least 3 characters long.']
    },
    colour:{
        type: String,
        required: [true, "All fields are mandatory."],
        minLength: [2, 'The colour should be at least 2 characters long.']
    },
    image:{
        type: String,
        required: [true, "All fields are mandatory.."],
        match:[ /^https?:\/\//, 'Please, enter a valid URL.']
    },
    location:{
        type: String,
        required: [true, "All fields are mandatory"],
        minLength: [5, 'The location should be at least 5 characters long'],
        maxLength: [15, 'The location should not exceed 15 characters.']
    },
    formula: {
        type: String,
        required: [true, "All fields are mandatory."],
        minLength: [3, 'The formula should be at least 3 characters long'],
        maxLength: [30, 'The formula should not exceed 30 characters.']
    },
    description:{
        type: String,
        required: [true, "All fields are mandatory"],
        minLength: [10, 'The descriptions should be at least 10 characters long.']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }], 
    
})

const Stone = mongoose.model('Stone', stoneSchema);

module.exports = Stone