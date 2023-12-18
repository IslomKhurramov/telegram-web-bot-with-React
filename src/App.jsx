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

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/payment"}>
          <PaymentForm />
        </Route>
        <Route path={"/"}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
