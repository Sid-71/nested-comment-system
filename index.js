const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config()
const commentRoute = require("./routes/comments");
app.use(express.json());

app.use("/comment",commentRoute);
app.listen(3000, () => {
    console.log("server is running 3000");
})

const url = process.env.MONGO_URI;
mongoose.connect(url)
  .then(() => {
    console.log('db is connected');
  })
  .catch((err) => {
    console.log(err);
  });














