import React from "react";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import { MdDelete } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function ExpenseItem({ title, date, price, id, category, onDeleteHandler }) {
  // const { ExpenseId } = useParams();
  const navigator = useNavigate();

  return (
    <div className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <h6
            style={{
              backgroundColor: "#40005d",
              marginBottom: "10px",
              textAlign: "center",
              padding: "10px 10px",
              borderRadius: "10px",
            }}
          >
            {category}
          </h6>

          <h2>{title}</h2>
        </div>
        <div>
          <div className="expense-item__price">$ {price}</div>
          <div className="expense-item__icons">
            <div
              className="expense-item__icon"
              onClick={() => {
                navigator(`/expense/${id}`);
              }}
            >
              <HiPencilAlt size={17} />
            </div>
            <div
              className="expense-item__icon"
              onClick={() => {
                onDeleteHandler(id);
              }}
            >
              <MdDelete size={17} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
