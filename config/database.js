const mongoose = require("mongoose");


require('dotenv').config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB Connection is Successful");
  } catch (error) {
    console.error("Issue in DB Connection:", error.message);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = dbConnect;




