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

const Page = mongoose.model('page', pageSchema);  

//Mongodb hooks
pageSchema.pre('save', (next) => {
  
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = Page;
