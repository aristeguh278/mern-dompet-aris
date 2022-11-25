const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const auth = require("../middleware/authMiddleware");
const User = require("../models/userModel");

//transfer money from one to another
router.post("/transfer-funds", auth, async (req, res) => {
  try {
    //save the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    //decrese the senders balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });

    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: +req.body.amount },
    });

    res.send({
      success: true,
      data: newTransaction,
      message: "Success transfer",
    });
    //increase the senders balance
  } catch (error) {
    res.send({
      success: false,
      data: error.message,
      message: "Transaction Failed",
    });
  }
});

// verify receiver account
router.post("/verify-receiver-account", auth, async (req, res) => {
  try {
    const receiver = await User.findOne({ _id: req.body.receiver });
    if (receiver) {
      res.send({ message: "Account verified", data: receiver, success: true });

      console.log("ssfsdfdf");
    }
  } catch (error) {
    res.send({ message: "Account Not found", data: error.message, success: false });
    console.log(error.message);
  }
});

//get transactions of a user
router.post("/get-all-transactions-by-user", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender")
      .populate("receiver");
    res.send({ message: "Transaction fetched", data: transactions, success: true });
  } catch (error) {
    res.send({ message: "Transaction failed", data: error.message, success: false });
    console.log(error.message);
  }
});

module.exports = router;
