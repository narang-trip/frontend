import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import colors from 'tailwindcss/colors';
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TripList from "../components/TripList";
import Concept from "../components/Concept";
import Button from "../ui/Button";

const HomePage = () => {
  const [lineColor, setLineColor] = useState(colors.teal['400'])
  const { conceptColor } = useSelector((state) => state.concept);
  
  const [className, setClassName] = useState(`bg-${conceptColor}-500`);

  useEffect(() => {
    // conceptColor가 변경될 때마다 className 상태를 업데이트
    const newClassName = `w-full h-[20%] bg-${conceptColor}-500 rounded-3xl flex text-white items-center justify-center transition-colors duration-700`;
    setClassName(newClassName);
    setLineColor(colors[conceptColor]['400'])
  }, [conceptColor]);

  // useEffect(() => {
  //   getUser();
  // });

  // const getUser = () => {
  //   axios
  //     .get("/api/user/get")
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <Fragment>
      <div className={className}>
        뭔가 낭만적인 문구, 건축적인 문구 모험적인 문구 추천받아요. 
      </div>
      <div className="mt-2"
        style={{
          height: '5px',
          backgroundRepeat: 'repeat-x',
          backgroundImage: `linear-gradient(to right, ${lineColor} 33%, rgba(0, 0, 0, 0) 0%)`,
          backgroundSize: '40px 2px'
        }}
      >
      </div>
      <Concept />
      <div className="mt-2"
        style={{
          height: '5px',
          backgroundRepeat: 'repeat-x',
          backgroundImage: `linear-gradient(to right, ${lineColor} 33%, rgba(0, 0, 0, 0) 0%)`,
          backgroundSize: '40px 2px'
        }}
      >
      </div>
      <TripList />
    </Fragment>
  );
}

export default HomePage