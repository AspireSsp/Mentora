const Razorpay = require("razorpay");
const Transaction = require("../models/transactionModel");
const { User } = require("../models/userModel");

const razorpay = new Razorpay({
  key_id: "rzp_test_wQiHLwAfgu8v6y",
  key_secret: "kDflo5Bs647d23iCYyKK0qmX",
});

exports.payment = async (req, res) => {
  const amount = req.body.amount;
  const options = {
    amount: amount * 100, // amount in paise
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.saveTransaction = async (req, res) => {
  try {
    let { userId, amount, orderId, currency, paymentId } = req.body;
    amount = amount/100;

    console.log("yoo",amount)
    const transaction = new Transaction({
      userId,
      amount,
      currency,
      paymentId,
      orderId,
    });


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.wallet += amount;

    await user.save();

    await transaction.save();

    res
      .status(201)
      .json({ success: true, message: "Transaction saved successfully" });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res
      .status(500)
      .json({ success: false, message: error });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find(); 

    res.status(200).json({ success: true, transactions: transactions });
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ success: false, message: error });
  }
};