import React from "react";
import Box from "@mui/material/Box";
import LoadingLine from "../LoadingLine";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Contact = () => {
  return (
    <div>
      <LoadingLine />
      <Box
        component="form"
        sx={{
          marginTop: "5%",
          marginBottom: "5%",
          marginLeft: "7%",
          marginRight: "7%",
          textAlign: "center",
          border: "2px solid grey",
          "& .MuiTextField-root": { m: "2%", width: "23%" },
        }}
      >
        <h4
          style={{ textAlign: "center", marginTop: "5vh", marginBottom: "5vh" }}
        >
          Do you need help? Would you like to contact us? Please fill out the
          form!
        </h4>
        <div>
          <TextField
            required
            id="filled-required"
            label="First Name"
            variant="filled"
            style={{ border: "2px solid grey" }}
          />
          <TextField
            required
            id="filled-required"
            label="Last Name"
            variant="filled"
            style={{ border: "2px solid grey" }}
          />
        </div>
        <div>
          <TextField
            required
            id="filled-required"
            label="Email"
            variant="filled"
            style={{ width: "50%", border: "2px solid grey" }}
          />
        </div>
        <div>
          <TextField
            required
            id="filled-required"
            label="Subject"
            variant="filled"
            style={{ width: "50%", border: "2px solid grey" }}
          />
        </div>
        <div>
          <TextField
            required
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="filled"
            style={{ width: "50%", border: "2px solid grey" }}
          />
        </div>
        <div>
          <Box
            sx={{
              "& .MuiButton-root": { m: "2%", width: "23%" },
            }}
          >
            <Button variant="contained">Clear</Button>
            <Button variant="contained">Submit</Button>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Contact;
