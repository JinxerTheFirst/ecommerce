// Components/WishList/WishList.js
import React, { useContext } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function WishList() {
  const { wishlist, removeFromWishlist } = useContext(WishListContext);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-semibold mb-5">WishList</h1>
      {wishlist.length > 0 ? (
        <div className="flex flex-wrap">
          {wishlist.map((product) => (
            <div key={product.id} className="sm:w-full md:w-1/4 p-2">
              <div className="product border border-transparent hover:border-green-500 hover:shadow-lg transition-all duration-500 p-2 group">
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    className="w-5/6 mx-auto"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="block font-medium text-green-500 ps-5">
                    {product.category.name}
                  </span>
                  <h3 className="font-medium ps-5 pt-5">{product.title}</h3>
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
                <div className="text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    className="bg-red-500 rounded-md px-5 py-2"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}
