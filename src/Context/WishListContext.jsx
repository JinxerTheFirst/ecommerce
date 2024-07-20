// Context/WishListContext.js
import { createContext, useState, useEffect } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    // Initialize wishlist from local storage
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    // Save wishlist to local storage whenever it changes
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishListContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isProductInWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
