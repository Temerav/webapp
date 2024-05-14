// WelcomeDashboard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import Box from "@mui/material/Box";

const Profile = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("session");
    history("/");
  };

  useState(() => {
    if (localStorage.getItem("session") !== null) {
      setUsername(JSON.parse(localStorage.getItem("session"))?.fullName);
    }
  }, [localStorage.getItem("session")]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Box
        component={"form"}
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
        <br />
        <div>
          <h2 className="mb-4 text-center">Welcome to Profile!</h2>
        </div>
        <div>
          <p className="mb-4 text-center">Hello, {username}!</p>
        </div>
        <div>
          <p className="text-center">You are logged in successfully.</p>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleLogout}
          >
            Logout
          </button>
          <br />
          <div />
          <br />
        </div>
      </Box>
    </div>
  );
};

export default Profile;
