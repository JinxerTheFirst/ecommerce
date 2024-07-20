import React, { useEffect, useState } from "react";
import mainSlider1 from "../../assets/images/main-slider.jpg";
import mainSlider2 from "../../assets/images/main-slider-2.png";
import mainSlider3 from "../../assets/images/main-slider-3.jpg";
import slide1 from "../../assets/images/slider-1.png";
import slide2 from "../../assets/images/slider-2.png";
import slide4 from "../../assets/images/slider-4.jpg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  const [first, setFirst] = useState();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-10 mb-20 px-4 md:px-20 lg:px-40 xl:px-80 container mx-auto">
        <div className="w-full lg:w-3/4">
          <Slider {...settings}>
            <img
              src={mainSlider1}
              alt="Main slider 1"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
            />
            <img
              src={mainSlider2}
              alt="Main slider 2"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
            />
            <img
              src={mainSlider3}
              alt="Main slider 3"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
            />
          </Slider>
        </div>
        <div className="w-full lg:w-1/4 mt-4 lg:mt-0">
          <img
            src={slide1}
            alt="Slide 1"
            className="w-full h-[150px] sm:h-[200px] lg:h-[250px] mb-4"
          />
          <img
            src={slide4}
            alt="Slide 4"
            className="w-full h-[150px] sm:h-[200px] lg:h-[250px]"
          />
        </div>
      </div>
    </>
  );
}
