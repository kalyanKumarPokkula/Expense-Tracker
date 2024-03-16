import React, { useState } from "react";
import ExpenseUpdateForm from "./ExpenseUpdateFrom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../../New-ExpenseTracker/src/config";

const ExpenseUpdate = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const UpdateExpenseHandler = expense => {
    if (Object.keys(expense).length !== 0) {
      console.log(expense);
      async function updateExpense() {
        try {
          let response = await axios.patch(
            `${URL}/api/v1/expense/${id}`,
            { ...expense },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          console.log(response.data.data);

          navigator("/expenses");
        } catch (error) {
          console.log(error);
        }
      }
      updateExpense();
    } else {
      navigator("/expenses");
    }
  };
  return <ExpenseUpdateForm onSaveExpenseData={UpdateExpenseHandler} />;
};

export default ExpenseUpdate;
