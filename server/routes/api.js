const express = require('express'),
      router = express.Router(),
      MongoClient = require('mongodb').MongoClient,
	  ObjectID = require('mongodb').ObjectID,
	  mongoose = require('mongoose');

let mongodbUrl = 'mongodb://localhost:27017/mean-to-the-bone-db';

mongoose.connect(mongodbUrl, {useMongoClient: true})
	.then( () => {console.log('Successfully connected to the MongoDB database at URL: ' + mongodbUrl)})
	.catch( () => {console.log('Failed to connect ot the MongoDB database at URL' + mongodbUrl)});

// TODOS - import Mongo schemas
const User  = require('./../models/user');
const Page  = require('./../models/page');

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
			if (err) {
				sendError(err, res);
				return;
			}
			console.log("Users: ", users);

			response.data = users;
			res.json(response);
    });
});

router.get('/pages',(req, res) => {
	Page.find({}, (err, pages) => {
		if (err) {
			sendError(err, res);
			return;
		}
		console.log("Pages: ", pages);

		response.data = pages;
		res.json(response);
	});
});

module.exports = router;
