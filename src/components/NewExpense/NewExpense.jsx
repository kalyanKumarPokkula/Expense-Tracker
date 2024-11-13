import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { URL } from "../../config";

const NewExpense = (props) => {
  const navigator = useNavigate();
  const [success, setSuccess] = useState(false);
  const addExpenseHandler = (expensesData) => {
    async function addExpense() {
      try {
        let response = await axios.post(
          `${URL}/api/v1/expense`,
          {
            ...expensesData,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response.data.data);
        setSuccess(true);
        setTimeout(() => {
          navigator("/expenses");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }

    addExpense();
  };

  return (
    <div>
      {success && (
        <div
          style={{
            width: "29rem",
            marginTop: "16px",
            position: "absolute",
            top: "80px",
            right: "12px",
          }}
        >
          <Alert severity="success">
            successfully created a expense alert — check it out!!
          </Alert>
        </div>
      )}
      <ExpenseForm onSaveExpenseData={addExpenseHandler} />
    </div>
  );
};

export default NewExpense;
