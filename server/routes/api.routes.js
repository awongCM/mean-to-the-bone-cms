const express = require("express"),
  router = express.Router();

//Setting up API routes
const users = require("./api/page.users");
const pages = require("./api/page.routes");
const headers = require("./api/footer.routes");
const footers = require("./api/footer.routes");

router.use("/users", users);
router.use("/pages", pages);
router.use("/headers", headers);
router.use("/footers", footers);

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to CMS-to-the-bone MEAN stack API service" });
});

// 	  mongoose = require('mongoose');

// let mongodbUrl = 'mongodb://localhost:27017/mean-to-the-bone-cms-db';

// mongoose.connect(mongodbUrl, {useMongoClient: true})
// 	.then( () => {console.log('Successfully connected to the MongoDB database at URL: ' + mongodbUrl)})
// 	.catch( () => {console.log('Failed to connect ot the MongoDB database at URL' + mongodbUrl)});

module.exports = router;
