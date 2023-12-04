const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    *User Schema
*/
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accountType: {type: String, required: true, enum: ['patron', 'artist']},
    firtName: String,
    lastName: String
});

/*
    *Adding User collection in to the db
*/
const User = mongoose.model('User', userSchema);

module.exports = User;