mongoose = require("mongoose");

const MONGODBURL = "mongodb://localhost:27017/mean-to-the-bone-cms-db";

const openDB = async () => {
  try {
    console.log(`Connecting to ${MONGODBURL}...`);
    const result = await mongoose.connect(
      MONGODBURL,
      { useMongoClient: true }
    );
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  MONGODBURL: MONGODBURL,
  openDB: openDB
};
