import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  async function handleForgotPassword(formValues) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        formValues
      );
      console.log(data);
      setSuccessMessage("A verification code has been sent to your email.");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/reset-password", { state: { email: formValues.email } });
      }, 1000);
    } catch (apiResponse) {
      const errorMsg =
        apiResponse?.response?.data?.message ||
        "An error occurred. Please try again.";
      setErrorMessage(errorMsg);
    }
    console.log(formValues);
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <>
      <h1 className="text-center mt-10 text-5xl text-green-700">
        Forgot Password
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto p-10 bg-slate-200 mt-10"
      >
        {successMessage && (
          <div className="text-green-500 text-sm mb-5">{successMessage}</div>
        )}
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
            className="peer-focus:font-medium absolute text-sm z-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-600 peer-focus:dark:text-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
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
