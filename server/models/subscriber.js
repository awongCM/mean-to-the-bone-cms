const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  name: String,
  phone: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  created_at: Date,
  updated_at: Date
});

subscriberSchema.pre("save", function(next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = mongoose.model("subscriber", subscriberSchema);
