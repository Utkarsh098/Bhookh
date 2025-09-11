const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_LOCAL_URL)
    .then(() => {
      console.info("Connected to bhookhApp DB");
    })
    .catch((err) => {
      console.error("Error connecting to DB \n", err);
    });
}

module.exports = connectDB;
 