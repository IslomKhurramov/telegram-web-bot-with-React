import React, { useState, useEffect } from "react";

const PaymentForm = () => {
  return (
    <div>
      <h2>Payment Information</h2>
      <form>
        {/* Add form fields for payment information, address, name, and phone number */}
        {/* Example: */}
        <label>Name:</label>
        <input type="text" name="name" required />
        {/* Add more form fields as needed */}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};
export default PaymentForm;
