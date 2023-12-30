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

  const handlePaymentOption = (event) => {
    const selectedOptionPayment = event.target.value;
    setPaymentOption(selectedOptionPayment);
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setDeliveryOption(selectedOption);

    setUserData((prevUserData) => ({
      ...prevUserData,
      deliveryOption: selectedOption,
      address: selectedOption === "delivery" ? address : "",
    }));
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log("files:::", file);
    } else {
      console.log("no file");
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleNumber = (event) => {
    setNumber(event.target.value);
  };
  const backToMainHandler = () => {
    history.push(`/`);
  };

  const submit = (e) => {
    e.preventDefault();

    console.log("+++", file);

    if (file) {
      userDataRef.current = {
        name,
        number,
        deliveryOption,
        address: deliveryOption === "delivery" ? address : "",
        paymentOption,
        deposited: file,
      };
      console.log("DATAS:", userDataRef.current);
      setFile(null); // Clear the file input after submitting
      teleg.MainButton.text = "Submit";
      teleg.MainButton.show();
    } else {
      console.warn("No file uploaded."); // Log a warning if file is not selected
    }

    if (file) {
      console.log("files:::", file);
    } else {
      console.log("no file");
    }
  };

  useEffect(() => {
    const onSendData = () => {
      teleg.sendData(
        JSON.stringify({ cartItems, userData: userDataRef.current }),
        [cartItems, userDataRef.current]
      );
    };

    teleg.onEvent("mainButtonClicked", onSendData);

    return () => {
      teleg.offEvent("mainButtonClicked", onSendData);
    };
  }, [cartItems]);

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
            aria-label="delivery-option"
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
                style={{
                  color: "white",
                  marginTop: "10px",
                }}
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
