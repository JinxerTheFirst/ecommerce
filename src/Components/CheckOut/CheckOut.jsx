import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CheckOut() {
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const { cartId } = useParams();
  console.log(cartId);

  const validationSchema = Yup.object().shape({
    shippingAddress: Yup.object().shape({
      city: Yup.string().required("City is required"),
      phone: Yup.string()
        .matches(
          /^(010|011|012|015)\d{8}$/,
          "Phone number must be an Egyptian number starting with 010, 011, 012, or 015"
        )
        .required("Phone number is required"),
      details: Yup.string().required("Address details are required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: function (values) {
      console.log(values);
      checkOutSession(values);
    },
  });

  function checkOutSession(data) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { data },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        window.open(response.data.session.url, "_blank");
      })
      .catch((error) => console.error("Checkout error:", error));
  }

  useEffect(() => {
    return () => {};
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-10">
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={values.shippingAddress?.city || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          name="shippingAddress.city"
          className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
            touched.shippingAddress?.city && !errors.shippingAddress?.city
              ? "border-green-500"
              : touched.shippingAddress?.city && errors.shippingAddress?.city
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="City"
        />
        {touched.shippingAddress?.city && errors.shippingAddress?.city ? (
          <div className="text-red-500 text-sm">
            {errors.shippingAddress.city}
          </div>
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={values.shippingAddress?.phone || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          name="shippingAddress.phone"
          type="text"
          className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
            touched.shippingAddress?.phone && !errors.shippingAddress?.phone
              ? "border-green-500"
              : touched.shippingAddress?.phone && errors.shippingAddress?.phone
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Phone Number"
        />
        {touched.shippingAddress?.phone && errors.shippingAddress?.phone ? (
          <div className="text-red-500 text-sm">
            {errors.shippingAddress.phone}
          </div>
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          value={values.shippingAddress?.details || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          name="shippingAddress.details"
          className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
            touched.shippingAddress?.details && !errors.shippingAddress?.details
              ? "border-green-500"
              : touched.shippingAddress?.details &&
                errors.shippingAddress?.details
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Address Details"
        />
        {touched.shippingAddress?.details && errors.shippingAddress?.details ? (
          <div className="text-red-500 text-sm">
            {errors.shippingAddress.details}
          </div>
        ) : null}
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Go To Online Payment Page
        </button>
        <button
          type="submit"
          className="text-white ms-5 bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Go To Cash Payment Page
        </button>
      </div>
    </form>
  );
}
