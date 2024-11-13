import React from "react";
import { useState, useEffect } from "react";
import "../NewExpense/ExpenseForm.css";
import "../NewExpense/NewExpense.css";
import "../../loading.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../config";

const ExpenseUpdateForm = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expense, setExpense] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function expense() {
      try {
        let response = await axios.get(`${URL}/api/v1/expense/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTitle(response.data.data.title);
        setAmount(response.data.data.price);

        const date = response.data.data.date.substring(0, 10);

        setDate(date);

        setExpense(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    expense();
  }, []);
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };
  const dataHandler = (event) => {
    setDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {};

    if (title !== expense.title) {
      expenseData.title = title;
    }

    if (amount !== expense.price) {
      expenseData.price = amount;
    }
    if (date !== expense.date.substring(0, 10)) {
      expenseData.date = new Date(date);
    }

    props.onSaveExpenseData(expenseData);

    setTitle("");
    setAmount("");
    setDate("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isLoading && <div className="loader"></div>}
      {!isLoading && (
        <form onSubmit={submitHandler} className="new_expense">
          {isLoading && <div className="loader"></div>}
          {!isLoading && (
            <div className="new-expense__controls">
              <div className="title">
                <h2>Update_Expense</h2>
              </div>
              <div className="new-expense__control">
                <label>Title</label>
                <input type="text" onChange={titleHandler} value={title} />
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
                <button type="submit">Update Expense</button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ExpenseUpdateForm;
