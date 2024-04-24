import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Contact = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [from, setFrom] = React.useState(
    "springbootapplicationwebshop@gmail.com",
  );
  const [to, setTo] = React.useState("springbootapplicationwebshop@gmail.com");
  const [cc, setCc] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleEmail = async () => {
    setSuccess("");
    setLoading(true);
    try {
      if (!firstName || !lastName || !from || !to || !cc || !subject || !text) {
        setLoading(false);
        setError("Please fill all fields.");
        return;
      }

      await axios.post("http://localhost:8080/email", {
        firstName,
        lastName,
        from,
        to,
        cc,
        subject,
        text,
      });

      setLoading(false);
      setSuccess("Email sent successfully");
      setFirstName("");
      setLastName("");
      setFrom("");
      setTo("");
      setCc("");
      setSubject("");
      setText("");
      setError("");
    } catch (error) {
      console.error(
        "Email sending failed:",
        error.response ? error.response.data : error.message,
      );
      setLoading(false);
      setError("Email sending failed.");
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setFrom("");
    setTo("");
    setCc("");
    setSubject("");
    setText("");
    setError("");
    setSuccess("");
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
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
        <h4 style={{ textAlign: "center", marginBottom: "5vh" }}>
          Do you need help? Would you like to contact us? Please fill out the
          form!
        </h4>
        <div>
          <TextField
            required
            id="firstName"
            label="First Name"
            variant="filled"
            style={{ border: "2px solid grey" }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            variant="filled"
            style={{ border: "2px solid grey" }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id="cc"
            label="Email"
            variant="filled"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            style={{ width: "50%", border: "2px solid grey" }}
          />
        </div>
        <div>
          <TextField
            required
            id="subject"
            label="Subject"
            variant="filled"
            value={subject}
            style={{ width: "50%", border: "2px solid grey" }}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            id="text"
            label="Message"
            multiline
            rows={4}
            variant="filled"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "50%", border: "2px solid grey" }}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}{" "}
        {success && <p className="text-success">{success}</p>}{" "}
        {loading && <CircularProgress color="secondary" />}
        <div>
          <Box
            sx={{
              "& .MuiButton-root": { m: "2%", width: "23%" },
            }}
          >
            <Button variant="contained" onClick={clearForm}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleEmail}>
              Submit
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Contact;
