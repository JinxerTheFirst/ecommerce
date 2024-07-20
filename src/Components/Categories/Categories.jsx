import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-5">Categories</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-xl">Loading categories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border border-gray-300 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover mb-3 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
