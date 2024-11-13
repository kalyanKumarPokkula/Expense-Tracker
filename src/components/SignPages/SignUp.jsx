import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import { useNavigate, Link } from "react-router-dom";
import { URL } from "../../config";

const SignUp = () => {
  const navigator = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [isvalidMessage, setIsValidMessage] = useState(null);

  function SubmitHandler(e) {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setIsValidMessage("This is an alert — check it out input Feild!");
    }

    const user = {
      name,
      email,
      password,
    };

    console.log(user);
    async function SignupApi() {
      try {
        let response = await axios.post(`${URL}/api/v1/signup`, {
          ...user,
        });
        // localStorage.setItem("token", response.data.data.token);
        // setUser(response.data.data);
        console.log(response.data.data);
        navigator(`/verify?token=${response.data.data._id}`);
      } catch (error) {
        console.log("error");
      }
    }
    SignupApi();

    setEmail("");
    setName("");
    setPassword("");
  }
  return (
    <div className="sign-container">
      <div
        className="sign"
        style={{
          height: `${isvalidMessage ? "510px" : "460px"}`,
        }}
      >
        <div className="title">SIGN-UP</div>
        {isvalidMessage && <Alert severity="error">{isvalidMessage}</Alert>}
        <div className="input">
          <TextField
            style={{ backgroundColor: "white" }}
            id="filled-basic"
            label="Name"
            value={name}
            variant="filled"
            fullWidth={true}
            onChange={(e) => {
              setIsValidMessage(null);
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <TextField
            style={{ backgroundColor: "white" }}
            value={email}
            id="filled-basic"
            label="Email"
            variant="filled"
            type={"email"}
            fullWidth={true}
            onChange={(e) => {
              setIsValidMessage(null);
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            style={{ backgroundColor: "white" }}
            id="filled-basic"
            value={password}
            label="Password"
            variant="filled"
            type={"password"}
            fullWidth={true}
            onChange={(e) => {
              setIsValidMessage(null);
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={SubmitHandler}>Sign Up</button>
        <div className="bottom">
          <p>Already a user? </p> <Link to="/signin">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
