import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setuserLogin } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  async function handleLogin(formValues) {
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        formValues
      );
      console.log(response.data);

      if (response.data.message === "success") {
        localStorage.setItem("userToken", response.data.token);
        setuserLogin(response.data.token);
        navigate("/ecommerce");
      } else {
        const errorMsg =
          response?.data?.message || "An error occurred. Please try again.";

        if (errorMsg === "User not found") {
          setErrorMessage("User not registered. Please register first.");
        } else {
          setErrorMessage(errorMsg);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z]).{8,}$/,
        "Password must be at least 8 characters long, contain one uppercase letter"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <h1 className="text-center mt-10 text-5xl text-green-700">Login</h1>
      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto mt-10">
        {errorMessage && (
          <div className="text-red-500 text-sm mb-5">{errorMessage}</div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : formik.touched.email
                ? "border-green-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-600 peer-focus:dark:text-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : formik.touched.password
                ? "border-green-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-600 peer-focus:dark:text-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          LogIn
        </button>
        <div className="flex justify-between mt-10">
          <div>
            <p>
              don't have an account yet?{" "}
              <span className="font-semibold">
                <Link to={"/register"}>Register Now</Link>{" "}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">
                <Link to={"/forgot-password"}> Forgot Password?</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
