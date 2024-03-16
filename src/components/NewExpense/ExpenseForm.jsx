import React from "react";
import { useState } from "react";
import "./ExpenseForm.css";
import "./NewExpense.css";

const ExpenseForm = props => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const titleHandler = event => {
    setTitle(event.target.value);
  };

  const amountHandler = event => {
    setAmount(event.target.value);
  };
  const dataHandler = event => {
    setDate(event.target.value);
  };

  // Event handler to update the selected value when it changes
  const handleSelectChange = event => {
    setSelectedValue(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    const expenseData = {
      title: title,
      price: amount,
      category: selectedValue,
      date: new Date(date),
    };

    console.log(expenseData);

    props.onSaveExpenseData(expenseData);

    // setTitle("");
    // setAmount("");
    // setDate("");
    // setSelectedValue("");
  };

  return (
    <form onSubmit={submitHandler} className="new_expense">
      <div className="new-expense__controls">
        <div className="title">
          <h2>Add_Expense</h2>
        </div>
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleHandler} value={title} />
        </div>
        <div className="new-expense__control">
          <label>categories</label>
          <select
            id="category"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="">Select...</option>
            <option value="Groceries">Groceries</option>
            <option value="Transport">Transport</option>
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Debt">Debt</option>
            <option value="Savings">Savings</option>
            <option value="Investments">Investments</option>
            <option value="Insurance">Insurance</option>
            <option value="Donations">Donations</option>
            <option value="Gifts">Gifts</option>
            <option value="Apparel">Apparel</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            // min="0.01"
            onChange={amountHandler}
            value={amount}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            // min="2019-01-01"
            // max="2022-12-31"
            value={date}
            onChange={dataHandler}
          />
        </div>

        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
