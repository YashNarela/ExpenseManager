const xlsx = require("xlsx");

const Expense = require("../models/expense.model");

const addExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const { icon, category, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(200).json({ mssg: "All Fields Are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(200).json(newExpense);
  } catch (error) {}
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const newExpense = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json(newExpense);
  } catch (error) {
    res.status(400).json({ msg: "Unable To Get Income", error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {


      const userId = req.params.id;
    
        await Expense.findByIdAndDelete(userId);
    
        res.status(200).json({ msg: "Income Deleted Successfully" });
  } catch (error) {


  }
};

const downloadExpense = async (req, res) => {
  try {



      const userId = req.user.id;
    
        
        const  newExpense = await Expense.find({ userId }).sort({ date: -1 });
    
    
        const data = newExpense.map((item) => {
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
    
    
    





  } catch (error) {}
};

module.exports = { addExpense, getExpense, deleteExpense, downloadExpense };
