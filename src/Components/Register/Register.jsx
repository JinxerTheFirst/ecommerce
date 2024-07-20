import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let { setuserLogin } = useContext(UserContext);

  let navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(formValues, { resetForm }) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        formValues
      );
      console.log(data);

      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setuserLogin(data.token);
        navigate("/login");
      } else {
        setSuccessMessage(
          "Form submitted successfully You will now go To logIn Page!"
        );
        setErrorMessage("");
        resetForm();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (apiResponse) {
      const error = apiResponse?.response?.data?.message;
      if (error === "Email already registered") {
        setErrorMessage(
          "This email is already registered. Please use a different email."
        );
      } else {
        setErrorMessage("Email already registered.");
      }
      console.log(error);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "User Name must be at least 3 characters")
      .required("User Name is required")
      .max(10, "Max is 10 characters"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number is not valid")
      .required("Phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z]).{8,}$/,
        "Password must be at least 8 characters long and contain at least one letter"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <h1 className="text-center mt-10 text-5xl text-green-700">Register</h1>
      {successMessage && (
        <div className="text-center text-green-500 mb-5">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-center text-red-500 mb-5">{errorMessage}</div>
      )}
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-10">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : formik.touched.name
                ? "border-green-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-600 peer-focus:dark:text-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Name
          </label>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            name="phone"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500"
                : formik.touched.phone
                ? "border-green-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-600 peer-focus:dark:text-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          ) : null}
        </div>
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            name="rePassword"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              formik.touched.rePassword && formik.errors.rePassword
                ? "border-red-500"
                : formik.touched.rePassword
                ? "border-green-500"
                : "border-gray-300"
            } appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-600 peer-focus:dark:text-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.rePassword}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
