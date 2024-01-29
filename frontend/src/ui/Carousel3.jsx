import { Fragment, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
const Carousel3 = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative border border-solid border-black overflow-hidden ">
      <div className="flex transition-traslate ease-out duration-500 border border-solid border-black">
        {slides.map((slide, index) => {
          return (
            <div key={index} className="w-[800px] flex flex-wrap m-3">
              <img src={slide[0].url} className="w-[45%] h-[45%]"/>
              <img src={slide[1].url} />
              <img src={slide[2].url} />
              <img src={slide[3].url} />
            </div>
          );
        })}
      </div>

      <div className=" group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-point">
        <FaArrowAltCircleLeft onClick={prevSlide} size={30} />
      </div>
      <div className=" group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-point">
        <FaArrowAltCircleRight onClick={nextSlide} size={30} />
      </div>
      {/* <div className="flex top-4 justify-center p-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Carousel3;
