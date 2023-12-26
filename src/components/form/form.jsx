import React, { useState, useEffect, useCallback } from "react";
import "./form.css";
import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useHistory, useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useRef } from "react";

const teleg = window.Telegram.WebApp;

const PaymentForm = (props) => {
  const history = useHistory();
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const { onCheckout, setUserData, userData, cartItems } = props;

  const userDataRef = useRef({});

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setDeliveryOption(selectedOption);
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

  useEffect(() => {
    // Update userData based on the selected option
    if (deliveryOption === "transfer") {
      const uploadedFile = file;
      setUserData({
        name,
        number,
        deliveryOption,
        address: deliveryOption === "delivery" ? address : "",
        deposited: uploadedFile,
      });
    } else {
      // For other options, update userData without the file
      setUserData({
        name,
        number,
        deliveryOption,
        address: deliveryOption === "delivery" ? address : "",
        deposited: null,
      });
    }
  }, [deliveryOption, file, name, number, address, setUserData]);

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
              value={address} // Fix: Bind value to the address state variable
              onChange={(event) => setAddress(event.target.value)} // Add an onChange handler to update the address state
            />
          )}
        </div>

        <div className="checkbox">
          <RadioGroup
            aria-label="payment-option"
            name="paymentOption"
            value={paymentOption}
            onChange={handlePaymentOption}>
            <FormControlLabel
              value="Cash"
              control={<Radio sx={{ color: "white" }} />}
              label="Cash"
            />
            <FormControlLabel
              value="transfer"
              control={<Radio sx={{ color: "white" }} />}
              label="Transfer"
            />
          </RadioGroup>

          {paymentOption === "transfer" && (
            <div>
              <Input
                type="file"
                accept=".jpeg, .jpg, .png, image/jpeg, image/jpg, image/png"
                onChange={handleImageChange}
                style={{ color: "white", marginTop: "10px" }}
              />
              {/* You can display additional UI or information related to file upload if needed */}
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
        {" "}
        Save
      </Button>
    </div>
  );
};
export default PaymentForm;
