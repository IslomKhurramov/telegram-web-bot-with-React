import React, { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./components/constants/db";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";

const foods = getData();

const teleg = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
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
      <div className="cards_container">
        {foods.map((food) => (
          <Card
            key={food.id}
            food={food}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
