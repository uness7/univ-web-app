const mongoose = require("mongoose");

const uri = "mongodb+srv://jd225025:5ZIcHg1FwrMbkNNR@app.g22pwha.mongodb.net/app?retryWrites=true&w=majority&appName=app";

const connectDB = async () => {
  try {
     // mongoose.set('strictQuery', true); // if set true => strict schema
      mongoose.connect(uri, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,});

        console.log("DB connection is established ")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = {
  mongoose,
  connectDB
};
