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

footerSchema.pre("save", function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

const Footer = mongoose.model("footer", footerSchema);

module.exports = Footer;
