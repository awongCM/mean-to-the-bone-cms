const mongoose = require("mongoose");

const MONGODBURL =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mean-to-the-bone-cms-db";

const openDB = async () => {
  try {
    console.log(`Connecting to ${MONGODBURL}...`);
    await mongoose.connect(MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
};

module.exports = {
  MONGODBURL: MONGODBURL,
  openDB: openDB
};
