const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// define header schema
const headerSchema = new Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});

headerSchema.pre("save", function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

const Header = mongoose.model("header", headerSchema);

module.exports = Header;
