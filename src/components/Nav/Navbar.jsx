import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigator = useNavigate();
  return (
    <div className="nav">
      <div className="logo" onClick={() => navigator("/")}>
        Exp_<span>Tracker</span>
      </div>
      {!user && (
        <div className="btn-container">
          <div className="logout-btn" onClick={() => navigator("/signin")}>
            Sign in
          </div>
          <div className="logout-btn" onClick={() => navigator("/signup")}>
            Sign up
          </div>
        </div>
      )}
      {user && (
        <div className="btn-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginRight: "10px",
            }}
          >
            <div
              className="btn"
              onClick={() => {
                navigator("/expense");
              }}
            >
              Add Expense
            </div>
            <div
              className="btn"
              onClick={() => {
                navigator("/expenses");
              }}
            >
              Expenses
            </div>
          </div>
          <div
            className="logout-btn"
            onClick={() => {
              localStorage.setItem("token", null);
              setUser(null);
              navigator("/");
            }}
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
