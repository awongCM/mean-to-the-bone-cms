const express = require('express'),
      router = express.Router(),
      MongoClient = require('mongodb').MongoClient,
			ObjectID = require('mongodb').ObjectID;
			mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mean-to-the-bone-db');

// TODOS - import Mongo schemas
const User  = require('./../models/user');
const Page  = require('./../models/page');

// Connect
const connection = (callback) => {
    return MongoClient.connect('mongodb://localhost:27017/mean-to-the-bone-db', (err, db) => {
        if (err) return console.log(err);
        callback(db);
    });
};

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
