import type { Action, State } from "../types/types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "ADD_TO_CART":
      const existing = state.cart.find((p) => p.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((p) =>
            p.id === action.payload.id
              ? { ...p, quantity: (p.quantity || 1) + 1 }
              : p
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "CHANGE_QUANTITY":
      const existing1 = state.cart.find((p) => p.id === action.payload.id);

      if (action.payload.quantity < 1) {
        return {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload.id),
        };
      }
      if (existing1) {
        return {
          ...state,
          cart: state.cart.map((p) =>
            p.id === action.payload.id
              ? { ...p, quantity: action.payload.quantity || 0 }
              : p
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };

    default:
      return state;
  }
};
