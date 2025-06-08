import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CartProvider } from "../context/Context";

function Home() {
  return (
    <CartProvider>
      <div style={{ display: "flex" }}>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default Home;
