const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./productRoute");
const dotEnv = require("dotenv");

const app = express();
dotEnv.config();

app.use(cors());
app.use("/", route);

app.use("/uploads", express.static("uploads"));

const connection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Error while connecting Database", error)
  }
};

app.listen(8080, () => {
  console.log("Server started");
  connection();
});
