import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  useMemo(() => {
    if (localStorage.getItem("session") !== null) {
      history("/profile");
      setTimeout(() => {
        history("/login");
      }, 3000);
    }
  }, [history, localStorage.getItem("session")]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      const response = await axios
        .post("http://localhost:8080/auth/signin", {
          email,
          password,
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response ? error.response.data : error.message);
        });
      setLoading(false);
      console.log("Login successful:", response.data);
      localStorage.setItem("session", JSON.stringify(response.data));
      history("/profile");
    } catch (error) {
      setLoading(false);
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
      setError("Invalid email or password.");
    }
  };

  return (
    <Box
      style={{
        marginTop: "7vh",
        marginBottom: "2vh",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        "& .MuiTextField-root": { m: "2%", width: "23%" },
        position: "relative",
        boxShadow: "0 0 50px 0 rgba(0,0,0,0.2)",
        color: "inherit",
        borderRadius: "20px",
        maxWidth: "1200px",
        height: "90vh",
        alignContent: "center",
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
            style={{ height: "40px", width: "50%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div>
          <Textfield
            required
            wrapperClass="mb-4"
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            style={{ height: "40px", width: "50%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        {error && <p className="text-danger">{error}</p>}{" "}
        {loading && <CircularProgress color="secondary" />}
        <br />
        <div>
          <Button
            variant="contained"
            style={{ height: "50px", width: "50%" }}
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
    </Box>
  );
};

export default Login;
