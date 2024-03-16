import React from "react";
import "./ExpenseFilter.css";

function ExpenseFilter(props) {
  const expenseFilterByYearHandler = event => {
    props.onExpenseFilterByYear(event.target.value);
  };

  const expenseFilterByCategoryHandler = event => {
    props.onExpenseFilterByCategory(event.target.value);
  };

  return (
    <div className="expense-filter">
      <div className="expense-filter__control">
        <label>Filter</label>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <select
            className="select"
            value={props.selectedYear}
            onChange={expenseFilterByYearHandler}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <select
            id="category-filter"
            value={props.selectedCategory}
            onChange={expenseFilterByCategoryHandler}
          >
            <option value="">All...</option>
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
      </div>
    </div>
  );
}

export default ExpenseFilter;
