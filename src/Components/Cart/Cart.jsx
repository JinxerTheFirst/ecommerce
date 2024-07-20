import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const {
    getLoggedUserCart,
    updateCartItemCount,
    deleteProductItem,
    ClearCart,
    cartItemCount,
    checkOutSession,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    setCartDetails(response.data.data);
  }

  async function payment(params) {
    const { data } = await checkOutSession();
    if (data?.status == "success") {
      window.open(data.session.url);
    }
  }

  async function updateCartCount(productId, count) {
    let response = await updateCartItemCount(productId, count);
    setCartDetails(response.data.data);
  }

  async function deleteProduct(productId) {
    let response = await deleteProductItem(productId);
    setCartDetails(response.data.data);
  }

  async function clearCartItems() {
    setLoading(true);
    if (cartDetails?.products) {
      let response = await ClearCart(cartDetails.products);
      if (response.status === "success") {
        setCartDetails({ products: [], totalCartPrice: 0 });
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <h2 className="m-10 text-4xl text-green-600 text-center">
          SHOPPING CART
        </h2>
        <table className="w-1/2 mx-auto text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          {cartDetails?.products.map((product) => (
            <tbody key={product.product.id}>
              <tr className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-50 :hover:bg-gray-600">
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 :text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateCartCount(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:bg-gray-700 :hover:border-gray-600 :focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        updateCartCount(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:bg-gray-700 :hover:border-gray-600 :focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 :text-white">
                  <span>{product.price} EGP</span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteProduct(product.product.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                  >
                    remove
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="flex justify-between p-10 sm:w-full md:w-1/2 mx-auto">
          <div>
            <h3 className="text-black text-2xl">
              Total Price :{cartDetails?.totalCartPrice}
            </h3>
          </div>
          <div>
            <Link
              // onClick={payment}
              to={"/checkout/" + cartDetails?._id}
              className="bg-green-500 hover:bg-green-700 rounded-md px-5 py-2 text-white"
            >
              Proceed your payment
            </Link>
          </div>
          <div>
            <button
              onClick={clearCartItems}
              className="bg-red-500 hover:bg-red-700 transition-all rounded-md p-2 text-white"
              disabled={loading}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Clear Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
