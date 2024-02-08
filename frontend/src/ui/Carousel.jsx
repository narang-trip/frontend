import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

// 테스트용 주석입니다.
const CarouselTemplete = () => {
  const [transformValue, setTransformValue] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const concept = useSelector((state) => state.concept);
  useEffect(() => {
    getConceptTrip();
    console.log(concept);
  }, [concept]);

  const getConceptTrip = async () => {
    try {
      const res = await axios.get(
        `https://i10a701.p.ssafy.io/api/trip/trips/banner?tripConcept=${concept}`
      );
      const conceptTrips = res.data;
      console.log(conceptTrips);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSlide = (currentItem, currentSlide) => {
    // 현재 항목 및 해당 폭을 기반으로 새로운 transform 값을 계산합니다.
    const newTransformValue = -currentItem * itemWidth;
    setTransformValue(newTransformValue);
  };

  const handleResize = () => {
    // 창 크기 조정 시 항목 너비를 업데이트합니다.
    const currentWidth = document.querySelector(".carousel-item").offsetWidth;
    setItemWidth(currentWidth);
  };
  return (
    <Fragment>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out 0s"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div
          id="carousel_item"
          className="h-[200px] border border-black boder-solid flex flex-wrap"
        >
          <div className="w-[45%] h[auto] m-1 border border-solid border-black carousel-item"></div>
          <div className="w-[45%] h[auto] m-1 border border-solid border-black"></div>
          <div className="w-[45%] h[auto] m-1 border border-solid border-black"></div>
          <div className="w-[45%] h[auto] m-1 border border-solid border-black"></div>
        </div>
        <div className="h-[200px] border border-black boder-solid">Item 2</div>
        <div className="h-[200px] border border-black boder-solid">Item 3</div>
        <div className="h-[200px] border border-black boder-solid">Item 4</div>
        <div className="h-[200px] border border-black boder-solid">Item 5</div>
        <div className="h-[200px] border border-black boder-solid">Item 6</div>
      </Carousel>
    </Fragment>
  );
};

export default CarouselTemplete;
