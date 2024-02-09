import Button from "../ui/Button";
import Concept from "../components/Concept";
import TripList from "../components/TripList";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
  const [temmaColor, setTemmaColor] = useState("teal")
  const {conceptColor} = useSelector((state) => state.concept);
  
  useEffect(() => {
    
    setTemmaColor(`bg-${conceptColor}-500`);
  }, [conceptColor])

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
      <div className={`object-cover w-full h-[20%] ${temmaColor} rounded-full flex text-white items-center justify-center`}>
        일딴 입력해봄
      </div>
      <Concept />
      <TripList />
    </Fragment>
  );
}
