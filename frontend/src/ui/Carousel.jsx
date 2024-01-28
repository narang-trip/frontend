import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(currentIndex);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length-1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1000px] h-[600px] min-h-[300px] w-full m-auto py-16 px-4 border-solid border-black border-2 overflow-hidden relative flex flex-row ">
      {slides.map((slide, index) => {
        return (
          <div key={index} className={`border-solid border-black border-2 absolute w-[95%] h-[500px] flex flex-wrap ${index !== currentIndex ? 'hidden' : ''}`}>
            <div
              style={{ backgroundImage: `url(${slide[0].url})` }}
              className="w-[45%] h-[45%] rounded-2xl bg-center bg-cover m-2"
            ></div>
            <div
              style={{
                backgroundImage: `url(${slide[1].url})`,
              }}
              className="w-[45%] h-[45%] rounded-2xl bg-center bg-cover m-2 "
            ></div>
            <div
              style={{
                backgroundImage: `url(${slide[2].url})`,
              }}
              className=" w-[45%] h-[45%] rounded-2xl bg-center bg-cover m-2 "
            ></div>
            <div
              style={{
                backgroundImage: `url(${slide[3].url})`,
              }}
              className=" w-[45%] h-[45%] rounded-2xl bg-center bg-cover m-2 "
            ></div>
          </div>
        );
      })}

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-point">
        <FaArrowAltCircleLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-point">
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

export default Carousel;
