type Product = {
  id: string | number;
  image: { thumbnail: string };
  category: string;
  name: string;
  price: number;
  quantity?: number;
};

type State = {
  products: Product[];
  cart: Product[];
};

type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_TO_CART"; payload: Product }
  | {
      type: "CHANGE_QUANTITY";
      payload: { id: string | number; quantity: number };
    }
  | { type: "REMOVE_FROM_CART"; payload: { id: string | number } };

export type { Product, State, Action };
