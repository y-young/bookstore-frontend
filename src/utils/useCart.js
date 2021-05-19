import { useEffect, useState } from "react";

let listeners = [];
// userId = 0 for guest
// empty cart when logged out
const useCart = (userId = 0) => {
  const object2Array = (obj) => {
    let items = [];
    for (const id in obj) {
      if (Object.hasOwnProperty.call(obj, id)) {
        const item = obj[id];
        items.push(item);
      }
    }
    return items;
  };

  const getCart = () => {
    try {
      const items = window.localStorage.getItem(`cart_${userId}`);
      return items ? JSON.parse(items) : {};
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const [cartItems, setCartItems] = useState(() => {
    return object2Array(getCart());
  });

  useEffect(() => {
    listeners.push(setCartItems);
    return () => {
      listeners = listeners.filter((listener) => listener !== setCartItems);
    };
  }, [setCartItems]);

  const updateCart = (items) => {
    try {
      window.localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
      const newState = object2Array(items);
      listeners.forEach((notify) => {
        notify(newState);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (item) => {
    const items = getCart();
    if (items[item.id]) {
      return; // Already in cart
    }
    // Add new item to cart
    items[item.id] = { book: item, amount: 1 };
    updateCart(items);
  };

  const removeFromCart = (item) => {
    let items = getCart();
    delete items[item.id];
    updateCart(items);
  };

  const changeAmount = (item, amount) => {
    let items = getCart();
    items[item.id].amount = amount;
    updateCart(items);
  };

  const emptyCart = () => {
    updateCart({});
  };

  return { cartItems, addToCart, removeFromCart, changeAmount, emptyCart };
};

export default useCart;
