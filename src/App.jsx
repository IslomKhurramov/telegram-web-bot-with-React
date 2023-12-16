import React, { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./components/constants/db";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";
import SecondMeal from "./components/card/secondMeal";

const foods = getData();

const teleg = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    teleg.ready();
  });

  const onAddItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem) {
      const newData = cartItems.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity + 1 }
          : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };
  console.log("cart_items:", cartItems);

  const onRemoveItem = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter((c) => c.id !== existItem.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === existItem.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      );
      setCartItems(newData);
    }
  };
  // console.log("cart_items:", cartItems);

  const onCheckout = () => {
    teleg.MainButton.text = "Payment";
    teleg.MainButton.show();
  };
  return (
    <div className="App">
      <h1 className="title_chaykhana">Samarkand Chaykhana</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div>
        <Card onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
        {/* <SecondMeal onAddItem={onAddItem} onRemoveItem={onRemoveItem} /> */}
      </div>
    </div>
  );
}

export default App;
