import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { MDBContainer } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import Textfield from "@mui/material/TextField";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("ROLE_CUSTOMER");
  const [mobile, setMobileNumber] = useState("");
  const [error, setError] = useState(""); // State to manage error messages
  const history = useNavigate(); // Get the history object for redirection

  useMemo(() => {
    if (localStorage.getItem("session") !== null) {
      history("/dashboard");
      setTimeout(() => {
        history("/login");
      }, 3000);
    }
  }, [history, localStorage.getItem("session")]);

  const handleSignup = async () => {
    try {
      // Check for empty fields
      if (!fullName || !email || !password || !confirmPassword || !mobile) {
        setError("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post("http://localhost:8080/auth/signup", {
        fullName,
        email,
        password,
        role,
        mobile,
      });
      // Handle successful signup
      console.log(response.data);
      localStorage.setItem("session", JSON.stringify(response.data));
      history("/dashboard");
    } catch (error) {
      // Handle signup error
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message,
      );
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        style={{
          width: "30%",
          marginTop: "7%",
          marginBottom: "5%",
          marginLeft: "7%",
          marginRight: "7%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 0 50px 0 rgba(0,0,0,0.2)",
          color: "inherit",
          borderRadius: "20px",
        }}
      >
        <MDBContainer className="p-3">
          <div>
            <h2 className="mb-4 text-center">Create an Account</h2>
            {/* Render error message if exists */}
            {error && <p className="text-danger">{error}</p>}
            <Textfield
              required
              wrapperClass="mb-3"
              id="fullName"
              placeholder={"Full Name"}
              value={fullName}
              type="text"
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <Textfield
              required
              wrapperClass="mb-3"
              placeholder="Email Address"
              id="email"
              value={email}
              type="email"
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <Textfield
              required
              wrapperClass="mb-3"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div>
            <Textfield
              required
              wrapperClass="mb-3"
              placeholder="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <br />
          <div>
            <Textfield
              required
              wrapperClass="mb-2"
              placeholder="Mobile Number"
              id="mobileNumber"
              value={mobile}
              type="text"
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <br />
          <div>
            <Button
              variant="contained"
              style={{ height: "40px", width: "100%" }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </div>
          <div className="text-center">
            <p>
              <br />
              Already Registered? <a href="/">Login</a>
            </p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Signup;
