import "./Verify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const VerifyEmail = ({ setUser }) => {
  const [verified, setVerified] = useState(false);
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  //   const [error, setError] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    let urlToken = window.location.search.split("=")[1];

    if (urlToken == null) {
      navigator("/signup");
    }
    console.log(urlToken);
    setUserId(urlToken);
  }, []);

  function verifyHandler() {
    const payLoad = {
      userId: userId,
      otp: otp,
    };
    console.log("inside the verify");

    console.log(payLoad);
    setOtp("");

    async function init() {
      try {
        let response = await axios.post(`${URL}/api/v1/verify-otp`, payLoad);

        console.log(response.data.data);

        if (response.data.success) {
          setVerified(true);
          setTimeout(() => {
            localStorage.setItem("token", response.data.data.token);
            setUser(response.data.data);
            navigator("/expenses");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="verify-layout">
        {!verified && <h1 style={{ color: "#40005D" }}>Enter OTP</h1>}
        {verified && (
          <h1 style={{ color: "#40005D" }}>Successfully Verified</h1>
        )}
        <h3 style={{ color: "black", padding: "20px 0px" }}>
          Check your email for OTP
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <div
            style={{
              // width: "100px",
              // height: "100px",
              backgroundColor: "#40005D",
              padding: "0.7rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={verifyHandler}
          >
            <FaArrowRight color="white" fontSize="1.2em" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              color: "#40005D",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              let payLoad = {
                userId: userId,
              };
              async function init() {
                try {
                  let response = await axios.post(
                    `${URL}/api/v1/resend-otp`,
                    payLoad
                  );
                  console.log("resended otp");
                  console.log(response.data.data);
                } catch (error) {
                  console.log(error);
                }
              }

              init();
            }}
          >
            Resend
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
