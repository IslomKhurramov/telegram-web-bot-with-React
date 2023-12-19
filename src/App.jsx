import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    teleg.ready();
  });

  const onCheckout = () => {
    teleg.MainButton.text = "Submit";
    teleg.MainButton.show();
  };
  return (
    <Router>
      <Switch>
        <Route path={"/payment"}>
          <PaymentForm onCheckout={onCheckout} />
        </Route>
        <Route path={"/"}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
