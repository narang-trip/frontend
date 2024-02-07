import Button from "../ui/Button";
import Concept from "../components/Concept";
import TripList from "../components/TripList";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
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
    <div>
      <img
        src="/assets/travelBanner.jpg"
        className="object-cover w-full h-40"
      />
      <Concept />
      <TripList />
    </div>
  );
}
