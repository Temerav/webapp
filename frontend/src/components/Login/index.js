import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  useMemo(() => {
    if (localStorage.getItem("session") !== null) {
      history("/dashboard");
      setTimeout(() => {
        history("/login");
      }, 3000);
    }
  }, [history, localStorage.getItem("session")]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("session", JSON.stringify(response.data));
      history("/dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
      setError("Invalid email or password.");
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
          <h2 className="mb-4 text-center">Use Your Credentials</h2>
          <div>
            <Textfield
              required
              wrapperClass="mb-4"
              placeholder="Email address"
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
              wrapperClass="mb-4"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              style={{ height: "40px", width: "100%" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          {error && <p className="text-danger">{error}</p>}{" "}
          {/* Render error message if exists */}
          <br />
          <div>
            <Button
              variant="contained"
              style={{ height: "50px", width: "100%" }}
              onClick={handleLogin}
            >
              Sign in
            </Button>
          </div>
          <div className="text-center">
            <p>
              <br />
              Not a member? <a href="/signup">Register</a>
            </p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Login;
