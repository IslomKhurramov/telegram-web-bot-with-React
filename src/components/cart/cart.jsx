import Button from "../button/button";
import totalPrice from "../units/total_price";
import "./cart.css";
const Cart = (props) => {
  const { cartItems, onCheckout } = props;

  console.log("carditems", cartItems);
  // console.log("total", totalPrice(cartItems));

  return (
    <div className="cart_container">
      <p className="total">Total: ₩{totalPrice(cartItems)}</p>
      <Button
        className="cart_btn"
        title={`${cartItems.length === 0 ? "Order" : "Payment"}`}
        disable={cartItems.length === 0 ? true : false}
        onClick={onCheckout}></Button>
    </div>
  );
};
export default Cart;
