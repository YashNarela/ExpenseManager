const User = require("../models/user");

const xlsx = require("xlsx");

const Income = require("../models/income.model");

const addIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const { icon, source, amount, date } = req.body;

    // validation check for missing fields

    if (!source || !amount || !date) {
      return res.status(200).json({ mssg: "All Fields Are required" });
    }

    const newincome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newincome.save();

    res.status(200).json(newincome);
  } catch (error) {
    res.status(400).json({ msg: "Unable To Signup", error: error.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const income = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ msg: "Unable To Get Income", error: error.message });
  }
};

const deleteincome = async (req, res) => {
  try {
    const userId = req.params.id;

    await Income.findByIdAndDelete(userId);

    res.status(200).json({ msg: "Income Deleted Successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Unable To Delete Income", error: error.message });
  }
};

const downloadIncome = async (req, res) => {
  try {

    const userId = req.user.id;

    
    const income = await Income.find({ userId }).sort({ date: -1 });


    const data=income.map((item) => {
      return {
        Source: item.source,
        Amount: item.amount,
        Date: item.date,
      };
    });


    const wb= xlsx.utils.book_new();
    const ws=xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Income");

    xlsx.writeFile(wb, "Income.xlsx");

    res.download("Income.xlsx")




  } catch (error) {


    res.status(400).json({ msg: "Unable To Download Income", error: error.message });
  }
};

module.exports = {
  addIncome,
  getIncome,
  deleteincome,
  downloadIncome,
};
