import { useState } from "react";

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

  const updateCart = (items) => {
    try {
      setCartItems(object2Array(items));
      window.localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
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
    item.amount = 1;
    items[item.id] = item;
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
