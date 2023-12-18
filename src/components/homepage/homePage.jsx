import React, { useState, useEffect } from "react";
import Cart from "../cart/cart";
import SecondMeal from "../card/secondMeal";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ShashlikPage from "../shashlik/shashlik";
import Salads from "../salad/salad";
import Steakes from "../steake/steake";
import Bread from "../bread/bread";
import Deserts from "../desert/deserts";
import Drinks from "../drinks/drinks";
import Garnish from "../garnish/garnish";
import Card from "../card/card";

const teleg = window.Telegram.WebApp;

const HomePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [value, setValue] = React.useState("1");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
  useEffect(() => {
    teleg.ready();
  });

  useEffect(() => {
    const handleMainButtonClicked = () => {
      setShowPaymentForm(true);
    };

    teleg.onEvent("mainButtonClicked", handleMainButtonClicked);

    return () => {
      teleg.offEvent("mainButtonClicked", handleMainButtonClicked);
    };
  }, []);

  return (
    <div className="App">
      <h1 className="title_chaykhana">Samarkand Chaykhana</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />

      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <div className="scrollable-tabs" sx={{ overflowX: "auto" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  className="tablist"
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    backgroundColor: "rgba(228, 228, 228, 0.781)",
                    borderBottom: "1px solid white",
                    whiteSpace: "nowrap",
                    "& > *": {
                      flex: "0 0 auto",
                      minWidth: "210%", // Set a minimum width for each tab
                      padding: "2px", // Add padding to the tabs for better spacing
                    },
                    "@media screen and (min-width:200%)": {
                      // Adjust styles for smaller screens
                      flexDirection: "row", // Allow tabs to be in a single row
                    },
                  }}>
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="OUR SOUPS"
                    value="1"
                  />
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="SECOND MEAL"
                    value="2"
                  />
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="SHASHLIK"
                    value="3"
                  />
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="STEAKES"
                    value="4"
                  />
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="SALADS"
                    value="5"
                  />

                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="BREAD"
                    value="6"
                  />
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="GARNISH"
                    value="7"
                  />
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="DESERTS"
                    value="8"
                  />
                  <Tab
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                    label="DRINKS"
                    value="9"
                  />
                </TabList>
              </div>
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
              <Steakes onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="5">
              <Salads onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="6">
              <Bread onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="7">
              <Garnish onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="8">
              <Deserts onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
            <TabPanel value="9">
              <Drinks onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};
export default HomePage;
