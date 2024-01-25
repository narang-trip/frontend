import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
const Carousel2 = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(currentIndex)
  const prevSlide = () => {
    const isFirstSlide = currentIndex <= 3;
    const newIndex = isFirstSlide ? slides.length - 4 : currentIndex - 4;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex >= slides.length - 4;
    const newIndex = isLastSlide ? 0 : currentIndex + 4;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1000px] h-[400px] min-h-[300px] w-full m-auto py-16 px-4 border-solid border-black border-2 relative group flex flex-wrap overflow-hidden">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className={`w-[45%] h-1/2 rounded-2xl bg-center bg-cover m-2 duration-500 ease-out transition translate-x-[-${currentIndex*100/4}%]`}
      ></div>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex + 1].url})` }}
        className="w-[45%] h-1/2 rounded-2xl bg-center bg-cover m-2 "
      ></div>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex + 2].url})` }}
        className=" w-[45%] h-1/2 rounded-2xl bg-center bg-cover m-2 "
      ></div>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex + 3].url})` }}
        className=" w-[45%] h-1/2 rounded-2xl bg-center bg-cover m-2 "
      ></div>
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

export default Carousel2;
