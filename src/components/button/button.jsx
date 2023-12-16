// import "../card/card.css";
import "./button.css";
const Button = (props) => {
  const { title, type, onClick, disable } = props;

  return (
    <button
      className={`btn cart_btn ${
        (type === "add" && "add") ||
        (type === "remove" && "remove") ||
        (type === "checkout" && "checkout")
      } ${disable === true && "disabled"}`}
      onClick={onClick}
      disabled={disable}>
      {title}
    </button>
  );
};

export default Button;
