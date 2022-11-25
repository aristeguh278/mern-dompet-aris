const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const PORT = process.env.PORT || 4000;

const userRoutes = require("./routes/userRoutes");
app.use("/auth", userRoutes);

const transactionRoutes = require("./routes/transactionRouter");
app.use("/transaction", transactionRoutes);

const startServer = async () => {
  try {
    dbConfig;
    app.listen(PORT, () => console.log(`server is running on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
