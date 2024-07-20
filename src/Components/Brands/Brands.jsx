import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-3xl font-bold mt-10 mb-4">Brands</h1>
        {loading ? (
          <p>Loading brands...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-white shadow-md p-4">
                <h3 className="text-lg font-semibold">{brand.name}</h3>
                <p className="text-gray-500">{brand.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
