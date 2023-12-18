import React, { useState, useEffect } from "react";
import "./form.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const PaymentForm = () => {
  return (
    <div className="form-container">
      <h2>Payment Information</h2>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch", color: "white" },
          "& input": { color: "white !important" }, // Override text color
          "& label": { color: "white !important" },
        }}
        noValidate
        autoComplete="off">
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="filled-basic" label="Address" variant="filled" />
        <TextField
          type="number"
          id="standard-basic"
          label="Phone Number"
          variant="standard"
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
