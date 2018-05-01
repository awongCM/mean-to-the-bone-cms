const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// define footer schema
const footerSchema = new Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});

const Footer = mongoose.model('footer', footerSchema);  

//Mongodb hooks
footerSchema.pre('save', (next) => {
  
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = Footer;
