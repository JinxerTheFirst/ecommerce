import React, { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../Context/CounterContext";
import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { ClipLoader } from "react-spinners"; // Import the spinner

export default function Home() {
  const [loading, setLoading] = useState(true); // State to track loading status

  // Simulate data fetching for demonstration purposes
  useEffect(() => {
    const fetchData = async () => {
      // Simulate a delay to mimic fetching data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? ( // Show spinner while loading
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#4CAF50"} loading={loading} />
        </div>
      ) : (
        <div>
          <MainSlider />
          <CategoriesSlider />
          <RecentProducts />
        </div>
      )}
    </>
  );
}
