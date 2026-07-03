const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  phone: String,
  message: String,
  status: { type: String, enum: ["sent", "failed", "mock"], default: "mock" },
  providerId: String,
  pageId: { type: Schema.Types.ObjectId, ref: "page" },
  error: String,
  created_at: Date
});

notificationSchema.pre("save", function(next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

module.exports = mongoose.model("notification", notificationSchema);
