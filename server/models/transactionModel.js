const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // type: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", transactionModel);
