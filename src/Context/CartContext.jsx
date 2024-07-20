import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem("cartItemCount");
    if (storedCount) {
      setCartItemCount(parseInt(storedCount, 10));
    }
  }, []);
  function checkOutSession() {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/667eb211ed0dc0016c551f00?url=http://localhost:5173&&667eb211ed0dc0016c551f00`,
        {
          shippingAddress: {
            details: "",
            phone: "",
            city: "",
          },
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function updateCartCount(count) {
    const newCount = Math.max(count, 0);
    setCartItemCount(newCount);
    localStorage.setItem("cartItemCount", newCount.toString());
  }

  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        { headers }
      )
      .then((response) => {
        updateCartCount(cartItemCount + 1);
        return response;
      })
      .catch((error) => error);
  }

  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function deleteProductItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        const newCount = Math.max(cartItemCount - 1, 0);
        updateCartCount(newCount);
        return response;
      })
      .catch((error) => error);
  }

  async function ClearCart(cartItems) {
    try {
      for (const item of cartItems) {
        await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/cart/${item.product.id}`,
          { headers }
        );
      }
      updateCartCount(0);
      return { status: "success" };
    } catch (error) {
      console.log(error);
      return { status: "error" };
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItemCount,
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteProductItem,
        ClearCart,
        checkOutSession,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
