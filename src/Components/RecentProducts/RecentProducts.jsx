// Components/RecentProducts/RecentProducts.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
    useContext(WishListContext);

  const [recentProducts, setRecentProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getRecentProducts();
  }, []);

  async function addProduct(productId) {
    const response = await addProductToCart(productId);
    if (response.data.status === "success") {
      toast.success(response.data.message, {
        duration: 1500,
        position: "bottom-right",
      });
    } else {
      toast.error(response.data.message, {
        duration: 1500,
        position: "bottom-right",
      });
    }
  }

  function getRecentProducts() {
    setLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setRecentProducts(data.data);
        setFilteredProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const filtered = recentProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, recentProducts]);

  const getFirstTwoWords = (title) => {
    return title.split(" ").slice(0, 2).join(" ");
  };

  const handleWishlistClick = (product) => {
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.title} removed from wishlist`, {
        duration: 1500,
        position: "bottom-right",
      });
    } else {
      addToWishlist(product);
      toast.success(`${product.title} added to wishlist`, {
        duration: 1500,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <form className="max-w-md mx-auto mt-10">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for products..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#4CAF50"} loading={loading} />
        </div>
      ) : (
        <div className="flex flex-wrap container mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="sm:w-full md:w-1/4 p-2 container mx-auto"
            >
              <div className="product border border-transparent hover:border-green-500 hover:shadow-lg rounded-xl transition-all duration-500 p-2 group">
                <Link to={`productdetails/${product.id}`}>
                  <img
                    className="w-5/6 mx-auto"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="block font-medium text-green-500 ps-5">
                    {product.category.name}
                  </span>
                  <h3 className="font-medium ps-5 pt-5">
                    {getFirstTwoWords(product.title)}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="px-5">{product.price} EGP</h4>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "#FFD43B" }}
                      />
                      <h4 className="px-2">{product.ratingsAverage}</h4>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-end pe-10 mt-3">
                  <button className="cursor-pointer">
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{
                        color: isProductInWishlist(product.id)
                          ? "red"
                          : "#9999",
                      }}
                      onClick={() => handleWishlistClick(product)}
                    />
                  </button>
                </div>
                <div className="text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    onClick={() => addProduct(product.id)}
                    className="bg-green-500 rounded-md px-5 py-2"
                  >
                    Add to cart{" "}
                    <span>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ color: "#74C0FC" }}
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
