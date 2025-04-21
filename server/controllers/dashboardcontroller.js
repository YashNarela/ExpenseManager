const User = require("../models/user");

const xlsx = require("xlsx");

const Income = require("../models/income.model");

const { isvalidObjectId, Types } = require("mongoose");
const Expense = require("../models/expense.model");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },

      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    console.log("totalIncome", {
      totalIncome,
      userId: isvalidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },

      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    // get icome transiction in last 60 days

    const last60DaysIncomeTranscations = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    const incomeLast60days = last60DaysIncomeTranscations.reduce(
      (sum, trans) => sum + trans.amount,
      0
    );

    const last30daysExpenseTranscations = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    const expenseLast30days = last30daysExpenseTranscations.reduce(
      (sum, trans) => sum + trans.amount,
      0
    );

    const lastFiveTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),

      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalbalance:
        totalIncome[0]?.totalIncome - totalExpense[0]?.totalExpense || 0,
      totalIncome: totalIncome[0]?.totalIncome || 0,
      totalExpense: totalExpense[0]?.totalExpense || 0,

      last30daysExpenses: {
        total: expenseLast30days,

        transactions: last30daysExpenseTranscations,
      },

      last60daysIncome: {
        total: incomeLast60days,
        transactions: last60DaysIncomeTranscations,
      },

      recentTransactions: lastFiveTransactions,
    });
  } catch (error) {


    console.log(error);
    res.status(500).json({ msg: "Unable to get dashboard data" });
  }
};
