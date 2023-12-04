/*
    *Importing important packages
*/
const mongoose = require('mongoose');
const session = require ('express-session');
const express = require('express');
const app = express();

//Start the connection to the database
mongoose.connect('mongodb://127.0.0.1/Open_Gallery');

/*
    *session related
*/

const gallerySession = require('connect-mongodb-session')(session);

const Open_Gallery = new gallerySession ({
    uri : 'mongodb://127.0.0.1/Open_Gallery',
    collection: 'SessionData'
})




//Users have a first and last name
let userSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true }
});

//Compile the previously defined schema into a model
//The model is what we will use to work with user documents
//First parameter is a string representing collection name that will be used for this model
//Second parameter is the schema
let UserModel = mongoose.model('User', userSchema);

//Start the connection to the database
mongoose.connect('mongodb://127.0.0.1/someDatabaseName');

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	//Find all UserModel documents
	//Alternatively: UserModel.find({}, function(err, results){
	UserModel.find()
		.then(results => {
			console.log("Find all:");
			console.log(results);
		})
		.catch(err => {
			throw err;
		});

	//Find UserModel documents with firstName == Harry
	UserModel.find({ firstName: "Tigress" })
		.then(results => {
			console.log("Find users named Tigress:");
			console.log(results);
		})
		.catch(err => {
			throw err;
		});

	UserModel.findOne()
		.then(result => {
			console.log("Find one UserModel document:");
			console.log(result);

			//Result in this case is a UserModel document
			//So we can access/change any known properties
			// and save the changes with the save method
			result.lastName = "Young";
			result.save()
				.then(() => {
					console.log("User saved.");
				})
				.catch(err => {
					throw err;
				});
		})
		.catch(err => {
			throw err;
		});
});