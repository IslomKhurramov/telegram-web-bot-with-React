import React, { useState, useEffect, useCallback } from "react";
import "./form.css";
import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useRef } from "react";

const teleg = window.Telegram.WebApp;

const PaymentForm = (props) => {
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const { setUserData, cartItems } = props;

  const userDataRef = useRef({});

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setDeliveryOption(selectedOption);

    const uploadedFile = selectedOption === "transfer" ? file : null;
    setUserData({
      name,
      number,
      deliveryOption: selectedOption,
      address: selectedOption === "delivery" ? address : "",
      deposited: uploadedFile,
    });
  };

  const handlePaymentOption = (event) => {
    const selectedOption = event.target.value;
    setPaymentOption(selectedOption);
  };

  const handleImageChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const submit = () => {
    userDataRef.current = {
      name,
      number,
      deliveryOption,
      address: deliveryOption === "delivery" ? address : "",
      deposited: paymentOption === "transfer" ? file : null,
    };

    // Assuming teleg.MainButton is correctly set up
    teleg.MainButton.text = "Submit";
    teleg.MainButton.show();

    // Log the user data for testing
    console.log("UserDataREF:", userDataRef.current);

    // Additional logic or API calls can be added here
  };

  useEffect(() => {
    // Event listener for when the main button is clicked
    const onSendData = () => {
      teleg.sendData(
        JSON.stringify({ cartItems, userData: userDataRef.current }),
        [cartItems, userDataRef.current]
      );
    };

    teleg.onEvent("mainButtonClicked", onSendData);

    return () => teleg.offEvent("mainButtonClicked", onSendData);
  }, [cartItems, userDataRef]);

  return (
    <div className="form-container">
      <div>
        <span className="brend_box">
          <img
            src="../logo.png" // Replace with the correct path
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
          "& input": { color: "white !important", backgroundColor: "#2d3748" },
          "& label": { color: "white !important" },
        }}
        noValidate
        autoComplete="off">
        {/* Other form elements */}
        <div className="checkbox">
          <RadioGroup
            aria-label="delivery-option"
            name="deliveryOption"
            value={deliveryOption}
            onChange={handleOptionChange}>
            {/* Radio buttons for delivery options */}
          </RadioGroup>

          {deliveryOption === "delivery" && (
            <TextField
              sx={{ border: "1px solid white", width: "100%" }}
              id="filled-basic"
              label="Address"
              variant="filled"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          )}
        </div>

        <div className="checkbox">
          <RadioGroup
            aria-label="payment-option"
            name="paymentOption"
            value={paymentOption}
            onChange={handlePaymentOption}>
            {/* Radio buttons for payment options */}
          </RadioGroup>

          {paymentOption === "transfer" && (
            <div>
              <Input
                type="file"
                accept=".jpeg, .jpg, .png, image/jpeg, image/jpg, image/png"
                onChange={handleImageChange}
                style={{ color: "white", marginTop: "10px" }}
              />
            </div>
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
        Save
      </Button>
    </div>
  );
};

export default PaymentForm;
