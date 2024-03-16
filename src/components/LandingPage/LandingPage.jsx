import React from "react";
import "./LandingPage.css";
import expense from "../../expenseImage.png";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ user, setUser }) => {
  const navigator = useNavigate();
  return (
    <div className="landingpage-contianer">
      <Grid container>
        <Grid item xs={6}>
          <div className="title">
            <h1>Track your Expenses</h1>
            {!user && (
              <div className="btn-container">
                <div
                  className="btn"
                  onClick={() => {
                    navigator("/signin");
                  }}
                >
                  Sign in
                </div>
                <div className="btn" onClick={() => navigator("/signup")}>
                  Sign up
                </div>
              </div>
            )}
            {user && (
              <div className="btn-container">
                <div
                  className="btn"
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
        </Grid>
        <Grid item xs={6}>
          <div className="img">
            <img src={expense} alt="expense" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
