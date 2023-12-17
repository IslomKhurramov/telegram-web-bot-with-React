import React, { useState } from "react";
import Button from "../button/button";
import { getData } from "../../components/constants/db";

import "../card/card.css";

const foods = getData();

const Card = (props) => {
  const [counts, setCounts] = useState(new Array(foods.length).fill(0));
  const { onAddItem, onRemoveItem } = props;

  const handleIncrement = (foodIndex) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[foodIndex] += 1;
      onAddItem(foods[foodIndex]);
      return newCounts;
    });
  };

  const handleDecrement = (foodIndex) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      newCounts[foodIndex] = Math.max(0, newCounts[foodIndex] - 1);
      onRemoveItem(foods[foodIndex]);
      return newCounts;
    });
  };

  return (
    <div>
      <div className="cards_container">
        {foods.map((food, index) => (
          <div className="card_container" key={food.id}>
            <span
              className={`${
                counts[index] !== 0 ? "card_badge" : "card_badge_hidden"
              }`}>
              {counts[index]}
            </span>
            <div className="img_container">
              <img src={food.Image} alt={food.title} width={"100%"} />
            </div>

            <div className="card_body">
              <div className="food_title">{food.title}</div>
              <div className="food_price">₩{food.price}</div>
            </div>

            <div className="hr"></div>

            <div className="btn_container">
              <Button
                className="btn"
                title={"+"}
                onClick={() => handleIncrement(index)}
              />
              {counts[index] !== 0 && (
                <Button
                  title={"-"}
                  className="btn"
                  onClick={() => handleDecrement(index)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;