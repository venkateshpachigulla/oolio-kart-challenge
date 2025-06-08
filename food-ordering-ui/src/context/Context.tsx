import React, { createContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { Action, State } from "../types/types";
import { reducer } from "./Reducer";

const initialState: State = {
  products: [],
  cart: [],
};

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const API_URL = "https://orderfoodonline.deno.dev/api/product"; // Getting CORS error, so using local data for now

  useEffect(() => {
    // fetch(API_URL)
    fetch("../../public/products.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
