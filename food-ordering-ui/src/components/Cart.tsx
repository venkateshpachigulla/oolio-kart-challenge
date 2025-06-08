import React, { useContext, useState } from "react";
import "../styles/Cart.css";
import CartContext from "../context/Context";

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cart: items } = state;
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");

  const onRemove = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const placeOrder = async () => {
    // Getting cors error while performing api call
    setIsProcessing(true);
    fetch("https://orderfoodonline.deno.dev/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ couponCode: "", items: items }),
    })
      .then((res) => {
        setIsProcessing(false);
        if (!res.ok) throw new Error("Failed to add to cart");
        return res.json();
      })
      .then((data) => {
        setIsProcessing(false);
        setProcessingStatus("Order placed successfully!");
        console.log("Order placed successfully:", data);
      })
      .catch((err) => {
        setIsProcessing(false);
        setProcessingStatus("Failed to place order. Please try again.");
        console.error("Error:", err);
      });
  };

  const confirmOrder = async () => {
    try {
      await placeOrder();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const total = items?.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">
        Your Cart <span className="cart-count">({totalItems})</span>
      </h2>
      {items.length === 0 ? (
        <div className="cart-empty">Your cart is empty</div>
      ) : (
        <div>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-details">
                    <span className="cart-item-qty">{item.quantity}x</span>
                    <span className="cart-item-price">
                      @${item.price.toFixed(2)}
                    </span>
                    <span className="cart-item-total">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  &#10006;
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total-row">
            <span>Order Total</span>
            <span className="cart-total">${total.toFixed(2)}</span>
          </div>
          <div className="cart-note">
            <span className="cart-leaf">🌱</span>
            This is a <span className="cart-bold">carbon-neutral </span>delivery
          </div>
          <button className="cart-confirm-btn" onClick={confirmOrder}>
            {isProcessing ? "Processing..." : "Confirm Order"}
          </button>
          {processingStatus}
        </div>
      )}
    </div>
  );
};

export default Cart;
