import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "../src/components/card/card.css";

import PaymentForm from "./components/form/form";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Switch } from "react-router-dom";
import HomePage from "./components/homepage/homePage";

const teleg = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);

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

  useEffect(() => {
    teleg.ready();
  });

  const onCheckout = () => {
    teleg.MainButton.text = "Submit";
    teleg.MainButton.show();
  };

  const onSendData = useCallback(() => {
    teleg.onSendData(JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    teleg.onEvent("mainButtonClicked", onSendData);

    return () => teleg.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <Router>
      <Switch>
        <Route path={"/payment"}>
          <PaymentForm onCheckout={onCheckout} />
        </Route>
        <Route path={"/"}>
          <HomePage
            cartItems={cartItems}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
