import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
  };
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="overflow-hidden">
        <h2 className="font-semibold mt-10 text-2xl ms-5">
          Shop Now We Have EveryThing You Want And More:
        </h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div
              className="text-center flex justify-center p-1 mt-3 "
              key={category._id}
            >
              <img
                className="md:w-96 sm:w-full sm:h-full md:h-96 object-cover"
                src={category.image}
                alt={category.name}
              />
              <h2 className="font-semibold mt-1">{category.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
