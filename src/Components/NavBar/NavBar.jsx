import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { CounterContext } from "../../Context/CounterContext";
import { UserContext } from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";

export default function NavBar() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { cartItemCount } = useContext(CartContext); // Access cartItemCount from CartContext

  const handleNavToggle = () => {
    setIsNavVisible(!isNavVisible);
  };

  let { counter, userName, changeCounter } = useContext(CounterContext);
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  function logOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="sticky bg-blue-700 top-0 left-0 right-0 z-50 ">
        <div className=" container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full lg:w-auto ">
            <Link to={"/ecommerce"}>
              <img width={150} src={logo} alt="fresh cart logo" />
            </Link>
            <button className="lg:hidden p-2" onClick={handleNavToggle}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={`${
              isNavVisible ? "block" : "hidden"
            } lg:flex lg:flex-row items-center w-full justify-between`}
          >
            <div className="w-full lg:w-auto flex justify-center lg:justify-start ml-5">
              <ul className="flex flex-col lg:flex-row items-center lg:bg-transparent">
                {userLogin !== null ? (
                  <>
                    <li>
                      <NavLink
                        className="mx-3 py-2 text-1xl text-white sm:m-2"
                        to="/wishlist"
                      >
                        WishList
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="mx-3 py-2 text-1xl text-white sm:m-2"
                        to="/cart"
                      >
                        Cart
                        <span className="text-green-500 opacity-0"></span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="mx-3 py-2 text-1xl text-white sm:m-2"
                        to="/categorise"
                      >
                        Categorise
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="mx-3 py-2 text-1xl text-white sm:m-2"
                        to="/products"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="mx-3 py-2 text-1xl text-white sm:m-2"
                        to="/brands"
                      >
                        Brands
                      </NavLink>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>

            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <ul className="flex flex-col lg:flex-row items-center lg:bg-transparent">
                {userLogin === null ? (
                  <>
                    <i className="fa-brands mx-3 fa-tiktok"></i>
                    <li>
                      <NavLink className="mx-3 py-2 text-1xl" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="mx-3 py-2 text-1xl" to="/register">
                        Register
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="sm:text-center flex">
                    <Link
                      to={"/cart"}
                      className="text-white sm:m-2 text-xl relative cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faCartPlus} />
                      <span className="absolute text-white bg-green-500 rounded-full h-5 w-5 flex justify-center items-center  top-0 right-0 translate-x-1/2 -translate-y-1/2">
                        {cartItemCount}
                      </span>
                    </Link>
                    <span
                      onClick={logOut}
                      className="mx-3 py-2 text-white text-1xl cursor-pointer"
                    >
                      Log Out
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
