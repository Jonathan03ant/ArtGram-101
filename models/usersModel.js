const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    *User Schema
    *Patron User---> 'patron'
    *Artist User---> 'artist'
*/
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accountType: {
        type: String, 
        required: true, 
        enum: ['patron', 'artist']},
    firstName: String,
    lastName: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}],
    notifications: [String],
});

/*
    *Adding User collection in to the db
*/
const User = mongoose.model('User', userSchema);

module.exports = User;