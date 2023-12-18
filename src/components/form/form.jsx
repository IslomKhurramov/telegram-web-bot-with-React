import React, { useState, useEffect } from "react";
import "./form.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useHistory, useParams } from "react-router-dom";

const PaymentForm = () => {
  const history = useHistory();

  const backToMainHandler = () => {
    history.push(`/`);
  };
  return (
    <div className="form-container">
      <div>
        <span className="brend_box">
          <img
            onClick={backToMainHandler}
            src="../logo.png"
            alt="brend"
            className="logo"
          />
        </span>
        <h1 className="payment"> PAYMENT</h1>
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          border: "1px solid white",
          marginRight: "30px",
          marginLeft: "30px",
          "& input": { color: "white !important", backgroundColor: "#2d3748" }, // Override text color
          "& label": { color: "white !important" },
        }}
        noValidate
        autoComplete="off">
        <TextField id="outlined-basic" label="Name" variant="filled" />
        <TextField id="filled-basic" label="Address" variant="filled" />
        <TextField
          type="number"
          id="standard-basic"
          label="Phone Number"
          variant="filled"
        />
      </Box>
      <Button
        sx={{
          color: "white",
          marginTop: "20px",
          border: "1px solid white",
          fontWeight: "bold",
          fontSize: "12px",
        }}>
        {" "}
        Submit
      </Button>
    </div>
  );
};
export default PaymentForm;
