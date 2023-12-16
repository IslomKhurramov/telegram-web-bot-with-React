import { useState } from "react";
import Button from "../button/button";
import "./card.css";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const { food, onAddItem, onRemoveItem } = props;

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    onAddItem(food);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    onRemoveItem(food);
  };

  return (
    <div className="card_container">
      <span className={`${count !== 0 ? "card_badge" : "card_badge_hidden"}`}>
        {count}
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
        <Button className="btn" title={"+"} onClick={handleIncrement} />
        {count !== 0 && (
          <Button title={"-"} className="btn" onClick={handleDecrement} />
        )}
      </div>
    </div>
  );
};

export default Card;
