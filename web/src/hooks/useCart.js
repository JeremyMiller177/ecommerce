import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCart = () => {
  const { items, addItem, updateItemQuantity, removeItem, removeAll } =
    useContext(CartContext);

  return { items, addItem, updateItemQuantity, removeItem, removeAll };
};
