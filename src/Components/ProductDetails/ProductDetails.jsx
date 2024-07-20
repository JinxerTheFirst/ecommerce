import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import { WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
    useContext(WishListContext);
  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        fetchRelatedProducts(data.data.category._id, data.data._id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  function fetchRelatedProducts(categoryId, currentProductId) {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=9`
      )
      .then(({ data }) => {
        const filteredProducts = data.data.filter(
          (product) => product._id !== currentProductId
        );
        setRelatedProducts(filteredProducts);
      })
      .catch(() => {});
  }

  const getFirstTwoWords = (title) => {
    return title.split(" ").slice(0, 2).join(" ");
  };

  const handleWishlistToggle = (product) => {
    if (isProductInWishlist(product._id)) {
      removeFromWishlist(product._id);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4CAF50"} loading={loading} />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-10">
        <div className="flex flex-wrap items-center">
          <div className="md:w-1/4 sm:w-full">
            <Slider
              dots={true}
              infinite={true}
              speed={800}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {productDetails?.images.map((src, index) => (
                <img key={index} src={src} alt={productDetails?.title} />
              ))}
            </Slider>
          </div>
          <div className="md:w-3/4 sm:w-full p-10 overflow-hidden">
            <h3 className="font-medium pt-5">{productDetails?.title}</h3>
            <p className="mt-5">{productDetails?.description}</p>
            <div className="flex justify-between items-center mt-5">
              <div>
                <h4 className="">{productDetails?.price} EGP</h4>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
                <h4 className="px-2">{productDetails?.ratingsAverage}</h4>
              </div>
            </div>
            <div className="flex justify-end pe-10 mt-3">
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  color: isProductInWishlist(productDetails._id)
                    ? "red"
                    : "#9999",
                  cursor: "pointer",
                }}
                onClick={() => handleWishlistToggle(productDetails)}
              />
            </div>
            <div className="text-center text-xl mt-10">
              <button
                onClick={() => addProduct(productDetails._id)}
                className="bg-green-500 rounded-md px-5 py-2 w-1/2"
              >
                Add to cart{" "}
                <span className="text-xl">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    style={{ color: "#B197FC" }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-5">Related Products</h2>
        <div className="flex flex-wrap">
          {relatedProducts.map((product) => (
            <div key={product._id} className="sm:w-full md:w-1/4 p-2">
              <div className="product border border-transparent hover:border-green-500 rounded-xl hover:shadow-lg transition-all duration-500 p-2 group">
                <Link to={`/productdetails/${product._id}`}>
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
                  <div className="flex justify-end pe-10 mt-3">
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{
                        color: isProductInWishlist(product._id)
                          ? "red"
                          : "#9999",
                        cursor: "pointer",
                      }}
                      onClick={() => handleWishlistToggle(product)}
                    />
                  </div>
                  <div className="text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button
                      onClick={() => addProduct(product._id)}
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
