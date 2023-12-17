import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/components/card/card.css";
import { getData } from "./components/constants/db";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";
import SecondMeal from "./components/card/secondMeal";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Shashlik from "./components/shashlik/shashlik";
import ShashlikPage from "./components/shashlik/shashlik";
import Salads from "./components/salad/salad";

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
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  display: "flex", // Use flex display
                  maxWidth: "100%", // Set a maximum width for the TabList
                  overflowX: "auto", // Enable horizontal scrolling
                  whiteSpace: "nowrap",
                }}>
                <Tab
                  sx={{ color: "white", fontSize: "10px" }}
                  label="OUR SOUPS"
                  value="1"
                />
                <Tab
                  sx={{ color: "white", fontSize: "10px" }}
                  label="SECOND MEAL"
                  value="2"
                />
                <Tab
                  sx={{ color: "white", fontSize: "10px" }}
                  label="SHASHLIK"
                  value="3"
                />
                <Tab
                  sx={{ color: "white", fontSize: "10px" }}
                  label="SALADS"
                  value="4"
                />
                <Tab
                  sx={{ color: "white", fontSize: "10px" }}
                  label="BREAD"
                  value="5"
                />
                <Tab
                  sx={{ color: "white", fontSize: "10px" }}
                  label="BREAD"
                  value="5"
                />
                <Tab
                  sx={{ color: "white", fontSize: "10px" }}
                  label="BREAD"
                  value="5"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {" "}
              <Card onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="2">
              <SecondMeal onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="3">
              <ShashlikPage onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="4">
              <Salads onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default App;
