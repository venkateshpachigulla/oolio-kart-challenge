import React, { useContext } from "react";
import Product from "./Product";
import CartContext from "../context/Context.tsx";

const ProductList: React.FC = () => {
  const { state, dispatch } = useContext(CartContext);
  const { products } = state;

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={{ width: "100%", textAlign: "center", marginBottom: 24 }}>
        <h1>Food Ordering App</h1>
      </div>
      <h2 style={{ width: "100%" }}>Desserts</h2>
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={product.image.thumbnail}
          category={product.category}
          name={product.name}
          price={product.price}
          cartItem={state.cart.find((p) => p.id === product.id)}
          onAddToCart={() =>
            dispatch({ type: "ADD_TO_CART", payload: product })
          }
        />
      ))}
    </div>
  );
};

export default ProductList;
