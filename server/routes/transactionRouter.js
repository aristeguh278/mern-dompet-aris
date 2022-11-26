const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const auth = require("../middleware/authMiddleware");
const User = require("../models/userModel");
// const { loadStripe } = require("@stripe/stripe-js");

const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51M791ZK3dVkEG6ovCq6onyJtTqOWpIoSRWugXflA4BmPlkij3aGBip4ZnCVYXPvSskltVpiJpnKKrOlKKTu0Mk9r00vDj7cHtO"
);

//transfer money from one to another
router.post("/transfer-funds", auth, async (req, res) => {
  //const sender = req.body.userId;
  // console.log(req.body);

  // return;
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
    console.log(req.body);
    console.log("bodu");
    if (req.body.receiver === req.body.userId) {
      return res.send({
        success: false,
        data: receiver,
        message: "You cannot transfer to",
      });
    }
    if (receiver) {
      return res.send({ message: "Account verified", data: receiver, success: true });
    }
  } catch (error) {
    return res.send({ message: "Account Not found", data: error.message, success: false });
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

//deposit funds using stripe
router.post("/deposit-funds", auth, async (req, res) => {
  // const stripe = await loadStripe(
  //   "sk_test_51M791ZK3dVkEG6ovCq6onyJtTqOWpIoSRWugXflA4BmPlkij3aGBip4ZnCVYXPvSskltVpiJpnKKrOlKKTu0Mk9r00vDj7cHtO"
  // );
  try {
    const { token, amount, description } = req.body;

    // console.log(token);
    //create a customer
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // console.log(stripe);

    //create a charge
    // const charge = await stripe.charges.create(
    //   {
    //     amount,
    //     currency: "USD",
    //     customer: token.email,
    //     receipt_email: token.email,
    //     description,
    //   },
    //   {
    //     idempotency: uuidv4(),
    //   }
    // );
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      source: "tok_amex",
      description: "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
    });
    if (charge.status === "succeeded") {
      const newTransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount,

        description: "Top Up Balance",
        // type: "Deposit",
        status: "success",
      });
      await newTransaction.save();
      //increase the user balnce
      await User.findByIdAndUpdate(req.body.userId, { $inc: { balance: amount } });
      return res.send({ message: "Transaction Success", data: newTransaction, success: true });
    } else {
      return res.send({ message: "Gafal aja", data: charge, success: false });
    }
  } catch (error) {
    return res.send({ message: error.message, data: error.message, success: false });
  }
});

module.exports = router;
