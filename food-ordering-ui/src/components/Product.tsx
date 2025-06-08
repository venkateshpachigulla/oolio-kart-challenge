import React, { useContext } from "react";
import "../styles/Product.css";
import CartContext from "../context/Context";

type ProductProps = {
  id: number | string;
  image: string;
  category: string;
  name: string;
  price: number;
  onAddToCart: () => void;
  cartItem: any;
};

const Product: React.FC<ProductProps> = ({
  id,
  image,
  category,
  name,
  price,
  onAddToCart,
  cartItem,
}) => {
  const isInCart = cartItem && cartItem.quantity > 0;
  const { dispatch } = useContext(CartContext);

  const onUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "CHANGE_QUANTITY", payload: { id, quantity } });
  };
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      {isInCart ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="add-to-cart-btn"
            onClick={() => onUpdateQuantity(id, cartItem.quantity - 1)}
          >
            -
          </button>
          <div style={{ marginBottom: "12px", padding: "4px 8px" }}>
            {cartItem.quantity}
          </div>
          <button
            className="add-to-cart-btn"
            onClick={() => onUpdateQuantity(id, cartItem.quantity + 1)}
          >
            +
          </button>
        </div>
      ) : (
        <button className="add-to-cart-btn" onClick={onAddToCart}>
          <span role="img" aria-label="cart" style={{ marginRight: 8 }}>
            🛒
          </span>
          Add to Cart
        </button>
      )}

      <div className="product-category">{category}</div>
      <div className="product-name">{name}</div>
      <div className="product-price">${price.toFixed(2)}</div>
    </div>
  );
};

export default Product;
