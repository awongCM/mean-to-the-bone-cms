const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// define page schema
const pageSchema = new Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});

pageSchema.pre("save", function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

const Page = mongoose.model("page", pageSchema);

module.exports = Page;
