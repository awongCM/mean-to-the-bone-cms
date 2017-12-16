const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// define user schema
const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});
  
//Mongodb Callbacks Hooks
userSchema.pre('save', (next) => {
  
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
