import React from "react";
import "./SignIn.css";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../../New-ExpenseTracker/src/config";

const SignIn = ({ setUser }) => {
  const navigator = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isvalidMessage, setIsValidMessage] = useState(null);
  function SubmitHandler(e) {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setIsValidMessage("This is an alert — check it out input Feild!");
    }

    const user = {
      email,
      password,
    };

    console.log(user);
    async function SignInApi() {
      try {
        let response = await axios.post(`${URL}/api/v1/signin`, {
          ...user,
        });

        console.log(response.data, "inside signin user");
        if (response.data.data.isVerified) {
          localStorage.setItem("token", response.data.data.token);
          setUser(response.data.data);
          navigator("/expenses");
        } else {
          navigator(`/verify?token=${response.data.data.id}`);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setIsValidMessage(error.response.data.err.message);
      }
    }
    SignInApi();

    setEmail("");
    setPassword("");
  }
  return (
    <div className="sign-container">
      <div
        className="sign"
        style={{ height: `${isvalidMessage ? "430px" : "390px"}` }}
      >
        <div className="title">SIGN-IN</div>
        {isvalidMessage && <Alert severity="error">{isvalidMessage}</Alert>}
        <div className="input">
          <TextField
            style={{ backgroundColor: "white" }}
            id="filled-basic"
            label="Email"
            value={email}
            variant="filled"
            type={"email"}
            fullWidth={true}
            onChange={e => {
              setIsValidMessage(null);
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            style={{ backgroundColor: "white" }}
            id="filled-basic"
            label="Password"
            value={password}
            variant="filled"
            type={"password"}
            fullWidth={true}
            onChange={e => {
              setIsValidMessage(null);
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={SubmitHandler}>Sign in</button>
        <div className="bottom">
          <p>New here?</p> <Link to="/signup">Register </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
