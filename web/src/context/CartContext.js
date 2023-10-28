import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const getCartItemsFromStorage = () => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      return JSON.parse(cartItems);
    }
    return [];
  };

  const [items, setItems] = useState(getCartItemsFromStorage());

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    ({ data, quantity = 1 }) => {
      if (!data?.id) {
        return toast.error("No se ha podido agregar el artículo al carrito.");
      }

      const existingItemIndex = items.findIndex(
        (item) => item.data.id === data.id
      );

      if (existingItemIndex !== -1) {
        const newItems = [...items];
        newItems[existingItemIndex].quantity += quantity;
        setItems(newItems);
        toast.success(`Se ha agregado ${quantity} artículo(s) al carrito.`);
      } else {
        setItems([...items, { data, quantity }]);
        toast.success(`Se ha agregado ${quantity} artículo(s) al carrito.`);
      }
    },
    [items]
  );

  const updateItemQuantity = useCallback(
    (id, newQuantity) => {
      const existingItemIndex = items.findIndex((item) => item.data.id === id);

      if (existingItemIndex !== -1) {
        const newItems = [...items];
        newItems[existingItemIndex].quantity = newQuantity;
        setItems(newItems);
      } else {
        toast.error("No se ha podido actualizar la cantidad del artículo.");
      }
    },
    [items]
  );

  const removeItem = useCallback(
    (id) => {
      setItems([...items.filter((item) => item.data.id !== id)]);
      toast.success("Se ha eliminado el artículo del carrito.");
    },
    [items]
  );

  const removeAll = useCallback(() => setItems([]), []);

  const contextValue = useMemo(
    () => ({ items, addItem, updateItemQuantity, removeItem, removeAll }),
    [items, addItem, updateItemQuantity, removeItem, removeAll]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
