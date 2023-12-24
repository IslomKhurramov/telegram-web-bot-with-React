import React, { useState, useEffect, useCallback } from "react";
import "./form.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useHistory, useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

const teleg = window.Telegram.WebApp;

const PaymentForm = (props) => {
  const history = useHistory();
  const [deliveryOption, setDeliveryOption] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { onCheckout, setUserData, userData, cartItems } = props;

  console.log("UserData11:", userData);
  console.log("cartItems:", cartItems);

  const handleOptionChange = (event) => {
    setDeliveryOption(event.target.value);
    setUserData(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleNumber = (event) => {
    setNumber(event.target.value);
  };
  const backToMainHandler = () => {
    history.push(`/`);
    console.log("UserData:", userData);
  };
  const onSendData = useCallback(() => {
    teleg.sendData(JSON.stringify({ cartItems, userData }), [
      cartItems,
      userData,
    ]);
  }, [cartItems, userData]);

  const submit = () => {
    const userData = {
      name,
      number,
      deliveryOption,
      address: deliveryOption === "delivery" ? "Your Delivery Address" : "",
    };

    teleg.MainButton.text = "Submit";
    teleg.MainButton.show();
  };

  useEffect(() => {
    teleg.onEvent("mainButtonClicked", onSendData);

    return () => teleg.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

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
          borderRadius: "5px",
          marginRight: "30px",
          marginLeft: "30px",
          "& input": { color: "white !important", backgroundColor: "#2d3748" }, // Override text color
          "& label": { color: "white !important" },
        }}
        noValidate
        autoComplete="off">
        <TextField
          sx={{ border: "1px solid white" }}
          id="outlined-basic"
          label="Name"
          variant="filled"
          onChange={handleName}
          value={name}
        />
        <TextField
          sx={{ border: "1px solid white" }}
          type="number"
          id="standard-basic"
          label="Phone Number"
          variant="filled"
          onChange={handleNumber}
          value={number}
        />
        <div className="checkbox">
          <RadioGroup
            aria-label="delivery-option"
            name="deliveryOption"
            value={deliveryOption}
            onChange={handleOptionChange}>
            <FormControlLabel
              value="takeout"
              control={<Radio sx={{ color: "white" }} />}
              label="Take Out"
            />
            <FormControlLabel
              value="delivery"
              control={<Radio sx={{ color: "white" }} />}
              label="Delivery"
            />
          </RadioGroup>

          {deliveryOption === "delivery" && (
            <TextField
              sx={{ border: "1px solid white", width: "100%" }}
              id="filled-basic"
              label="Address"
              variant="filled"
            />
          )}
        </div>
      </Box>
      <Button
        type="checkout"
        onClick={submit}
        sx={{
          color: "white",
          marginTop: "20px",
          border: "1px solid white",
          fontWeight: "bold",
          fontSize: "12px",
        }}>
        {" "}
        Save
      </Button>
    </div>
  );
};
export default PaymentForm;
